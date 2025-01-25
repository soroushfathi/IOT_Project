from fastapi import WebSocket, APIRouter, WebSocketDisconnect, HTTPException
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
