from fastapi import WebSocket, APIRouter


router = APIRouter()




@router.websocket('/ws')
async def websocket_endpont(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
