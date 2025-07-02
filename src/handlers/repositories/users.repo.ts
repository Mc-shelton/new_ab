import { injectable, inject } from "tsyringe";
import { IuserInterface, userUpdate } from "../interface";
import { cuser, gUser, genRes } from "../types";
import {PrismaClient, users } from "@prisma/client";

@injectable()
class UserRepository implements IuserInterface {
  constructor(@inject("prisma") private readonly prisma: PrismaClient) { }
  async createUser(user: cuser): Promise<users> {
    const createUser = await this.prisma.users.upsert({
      where: {
        email: user.email,
      },
      create: {
        email: user.email,
        name: user.name,
        phone: user.phone ,
        status:'ACTIVE'
      },
      update: {
        name: user.name,
        phone:user.phone
      }
    });
    return createUser;
  }

  async getUser(user: gUser): Promise<users | null> {
    const theUser = this.prisma.users.findFirst({
      where: {
        AND: [
          { email: { equals: user.email } },
          { phone: { equals: user.phone } },
        ],
      }
    });
    return theUser;
  }
  async searchUser(user?: userUpdate): Promise<users[]> {
    if (!user?.name  && !user?.email && !user?.phone) return await this.prisma.users.findMany()
    return await this.prisma.users.findMany({
      where: {
        OR: [
          { email: { equals: user.email as string } },
          { name: { equals: user.name as string } },
          { phone: { equals: user.phone as string } },
        ]
      }
    })

  }
  async getUserById(id: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        id,
      }
    });
  }
  async deleteUser(email: string, actor: string): Promise<any> {
    const delUser = await this.prisma.users.update({
      where: {
        email,
      }, 
      data:{
        status: 'DELETED'
      }
    });
    return delUser.id;
  }
  async updateUser(user: users, actor: string): Promise<users> {
    const {acl, acls, Profile, BlackList, ...u} = user as any
    console.log(u)
    return await this.prisma.users.update({
      where: {
        id: user.id
      },
      data: u
    })

  }

  async signInUser(email: string, password: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        email,
      }
    })

  }

  async lockAccount(id: string): Promise<users | null> {
    return await this.prisma.users.update({
      where: {
        id
      },
      data: {
        status: 'BLOCKED'
      }
    })

  }

  async filterUser(user?: userUpdate): Promise<users[]> {

    if (!user) return await this.prisma.users.findMany()
    return await this.prisma.users.findMany({
      where: user as users
    })
  }

}

export default UserRepository;
