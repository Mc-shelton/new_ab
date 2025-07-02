import { inject, injectable } from "tsyringe";
import { Irooms } from "../interface";
import { chats, PrismaClient, rooms, userRooms } from "@prisma/client";

@injectable()
class RoomsRepository implements Irooms {
  constructor(@inject("prisma") private readonly prisma: PrismaClient) {}
  async createRoom(room: rooms): Promise<rooms> {
    return await this.prisma.rooms.create({
      data: room,
    });
  }
  async addChat(room_id: string, message: string, sender_id: string): Promise<chats> {
      return await this.prisma.chats.create({
        data:{
            room_id,
            message,
            sender_id,
            status:'DELIVERED'
        }
      })
  }
  async getRoomChats(room_id: string): Promise<chats[]> {
      return await this.prisma.chats.findMany({
        where:{
            room_id
        },
        orderBy:{
            created_at: 'asc'
        }
      })
  }
  async joinRoom(user_id:string, room_id:string):Promise<userRooms>{
    return await this.prisma.userRooms.create({
        data:{
            user_id,
            room_id
        }
    })
  }
  async getUserRooms(user_id: string): Promise<userRooms[]> {
      return await this.prisma.userRooms.findMany({
        include:{
            Room:{
                include:{
                    Owner:{
                        select:{
                            name:true,
                        }
                    }
                }
            },
        }

      })
  }
  async getRoomByName(title:string):Promise<rooms | null>{
  return await this.prisma.rooms.findUnique({
    where:{
        title
    }
  })
}
}

export default RoomsRepository;
