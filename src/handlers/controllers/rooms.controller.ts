import { Response } from "express";
import Logger from "../../startup/logger";
import { IRequest } from "../../types/service.interface";
import { roomsService } from "../services";
import { errorEnums } from "../types";
import { customErrorChecker } from "../errors";

const logger = new Logger("rooms controller");
const getUserRooms = async (req: IRequest, res: Response) => {
  const user = req.user;
  if (!user) return res.status(400).json({ message: errorEnums.PROFILE });
  try {
    const rooms = await roomsService.getUserRooms(user.id);
    res.status(200).json({ message: "user rooms", data: rooms });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const createRoom = async (req: IRequest, res: Response) => {
  const { title, ab_title, description } = req.body;
  const user = req.user;
  if (!user) return res.status(400).json({ message: errorEnums.PROFILE });
  if(!user.name) return res.status(400).json({
    message:'please update your user details to access this resource'
  })
  if (!title || !ab_title || !description)
    return res.status(400).json({ message: errorEnums.FIELDS });
  try {
    let room: any = {
      title,
      ab_title,
      description,
    };
    const newRoom = await roomsService.createRoom(room, user.id);
    res.status(200).json({ message: "room created", data: newRoom });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getRoomChats = async (req: IRequest, res: Response) => {
    const { room_id } = req.query;
    try {
      const chats = await roomsService.getRoomChats(room_id as string);
      res.status(200).json({ message: "room chats", data: chats });
    } catch (err: any) {
      const error = customErrorChecker(err);
      if (error) return res.status(400).json({ message: err.message });
      res.status(500).json({ message: errorEnums["SERVER"] });
      logger.genError(err.message);
    }
  };


  const addChat = async (req: IRequest, res: Response) => {
    const { room_id, message } = req.body;
    const user = req.user;
    if (!user) return res.status(400).json({ message: errorEnums.PROFILE });
    if (!room_id || !message)
      return res.status(400).json({ message: errorEnums.FIELDS });
    try {
      const chat = await roomsService.addChat(room_id, message, user.id);
      res.status(200).json({ message: "chat created", data: chat });
    } catch (err: any) {
      const error = customErrorChecker(err);
      if (error) return res.status(400).json({ message: err.message });
      res.status(500).json({ message: errorEnums["SERVER"] });
      logger.genError(err.message);
    }
  };
  


  const joinRoom = async (req: IRequest, res: Response) => {
    const { room_id } = req.body;
    const user = req.user;
    if (!user) return res.status(400).json({ message: errorEnums.PROFILE });
    if (!room_id)
      return res.status(400).json({ message: errorEnums.FIELDS });
    try {
      const room = await roomsService.joinRoom(user.id, room_id);
      res.status(200).json({ message: "chat created", data: room });
    } catch (err: any) {
      const error = customErrorChecker(err);
      if (error) return res.status(400).json({ message: err.message });
      res.status(500).json({ message: errorEnums["SERVER"] });
      logger.genError(err.message);
    }
  };
  
export { 
    getUserRooms,
    addChat,
    joinRoom,
    createRoom,
    getRoomChats
 };
