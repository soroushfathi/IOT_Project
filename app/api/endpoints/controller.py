from fastapi import WebSocket, APIRouter, WebSocketDisconnect, HTTPException, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.db.models import Controller
from app.db.schemas import ControllerSchema, CreateControllerSchema, UpdateControllerSchema
from app.utils.logger import logger

router = APIRouter()
raspberry_pi_connection = None


@router.put("/send-command")
async def send_command(command: dict):
    global raspberry_pi_connection
    if not raspberry_pi_connection:
        raise HTTPException(status_code=503, detail="Raspberry Pi is not connected")
    
    try:
        # Forward the command to the Raspberry Pi via WebSocket
        await raspberry_pi_connection.send_text(command["command"])
        return {"status": "Command sent to Raspberry Pi"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send command: {str(e)}")


@router.websocket('/ws/raspberry-pi')
async def websocket_raspberry_pi(websocket: WebSocket):
    global raspberry_pi_connection
    await websocket.accept()
    raspberry_pi_connection = websocket
    logger.info("Raspberry Pi connected.")
    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"Message text was: {data}")
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        logger.info("WS has been disconneted")
        raspberry_pi_connection = None


@router.get("/list", response_model=list[ControllerSchema])
def get_all_controllers(db: Session = Depends(get_db)):
    controllers = db.query(Controller).all()
    return controllers


@router.post("/create", response_model=ControllerSchema)
def create_controller(controller: CreateControllerSchema, db: Session = Depends(get_db)):
    new_controller = Controller(
        name=controller.name,
        description=controller.description,
        min_value=controller.min_value,
        max_value=controller.max_value
    )
    db.add(new_controller)
    db.commit()
    db.refresh(new_controller)
    return new_controller


@router.get("/{controller_id}", response_model=ControllerSchema)
def get_controller(controller_id: int, db: Session = Depends(get_db)):
    controller = db.query(Controller).filter(Controller.id == controller_id).first()
    if not controller:
        raise HTTPException(status_code=404, detail="Controller not found")
    return controller


@router.put("/{controller_id}", response_model=ControllerSchema)
def update_controller(controller_id: int, controller: UpdateControllerSchema, db: Session = Depends(get_db)):
    existing_controller = db.query(Controller).filter(Controller.id == controller_id).first()
    if not existing_controller:
        raise HTTPException(status_code=404, detail="Controller not found")

    if controller.name is not None:
        existing_controller.name = controller.name
    if controller.description is not None:
        existing_controller.description = controller.description
    if controller.min_value is not None:
        existing_controller.min_value = controller.min_value
    if controller.max_value is not None:
        existing_controller.max_value = controller.max_value

    db.commit()
    db.refresh(existing_controller)
    return existing_controller
