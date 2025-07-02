import { Router } from "express";
import { roomsController } from "../handlers/controllers";

const roomsRouter = Router()
roomsRouter.post('/', roomsController.createRoom)
roomsRouter.get("/", roomsController.getUserRooms)
roomsRouter.post("/chats", roomsController.addChat)
roomsRouter.get("/chats", roomsController.getRoomChats)
roomsRouter.post('/join', roomsController.joinRoom)

export default roomsRouter