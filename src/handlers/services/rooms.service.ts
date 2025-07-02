import {
  chats,
  events,
  periodicals,
  PrismaClient,
  rooms,
  sermons,
  userRooms,
} from "@prisma/client";
import { IEvents, IPeriodicals, Irooms } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";
import RoomsRepository from "../repositories/rooms.repol";
import { UniqueParam } from "../errors";

@injectable()
class RoomsService implements Irooms {
  constructor(
    @inject("roomsRepo") private readonly roomsRepo: RoomsRepository
  ) {}
  async createRoom(room: rooms, owner_id: string): Promise<rooms> {
    room.owner_id = owner_id;
    const existingRoom = await this.roomsRepo.getRoomByName(room.title);
    if (existingRoom) throw new UniqueParam("room", "title", room.title);
    const newroom = await this.roomsRepo.createRoom(room);
    await this.roomsRepo.joinRoom(owner_id, newroom.id);
    return newroom;
  }
  async addChat(
    room_id: string,
    message: string,
    sender_id: string
  ): Promise<chats> {
    return await this.roomsRepo.addChat(room_id, message, sender_id);
  }
  async getRoomChats(room_id: string): Promise<chats[]> {
    return await this.roomsRepo.getRoomChats(room_id);
  }
  async joinRoom(user_id: string, room_id: string): Promise<userRooms> {
      return await this.roomsRepo.joinRoom(user_id, room_id)
  }
  async getUserRooms(user_id: string): Promise<userRooms[]> {
    return await this.roomsRepo.getUserRooms(user_id);
  }
}

export default RoomsService;
