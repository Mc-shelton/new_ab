import { events, PrismaClient } from "@prisma/client";
import { IEvents } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";

@injectable()
class EventsRepository implements IEvents{
    constructor(
        @inject("prisma") private readonly prisma:PrismaClient
    ){}
    async createEvent(event: cevent): Promise<events> {
        return await this.prisma.events.create({
            data:event
        })
    }

    async getEvents(): Promise<events[]> {
        return await this.prisma.events.findMany({
            include:{
                Gallary:true
            },
            orderBy:{
                date:'desc'
            }
        })
    }
}

export default EventsRepository