import { events, items, orderItems, orderItemStatus, orders, PrismaClient, thumb_nails } from "@prisma/client";
import { IEvents, Ishops } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";

@injectable()
class ShopsRepository implements Ishops{
    constructor(
        @inject("prisma") private readonly prisma:PrismaClient
    ){}
    async createItem(item: items): Promise<items> {
        return await this.prisma.items.create({
            data:item
        })
    }
    async getItems(): Promise<items[]> {
        return await this.prisma.items.findMany()
    }
    async createOrder(order: orders): Promise<orders> {
        return await this.prisma.orders.create({
            data:order
        })
    }
    async changeOrderStatus(orderId: string, status:orderItemStatus): Promise<orders | null> {
        return await this.prisma.orders.update({
            where:{
                id:orderId
            },
            data:{
                status
            }
        })
    }
    async getUserOrders(userId: string): Promise<orders[]> {
        return await this.prisma.orders.findMany({
            where:{
                customer_id:userId
            },
            include:{
                OrderItems:{
                    include:{
                        Item:{
                            select:{
                                price:true,
                                name:true
                            }
                        }
                    }
                }
            }
            ,
            orderBy:{
                created_at:"desc"
            }
        })
    }
    async createOrderItem(items:orderItems[]):Promise<any>{
        return await this.prisma.orderItems.createMany({
            data:items
        })
    }
    async createItemThumbNails(nails:thumb_nails[]):Promise<any>{
        return await this.prisma.thumb_nails.createMany({
            data:nails
        })
    }
    async getOrderItemsByOrderId(id:string):Promise<orderItems[]>{
        return await this.prisma.orderItems.findMany({
            where:{
                order_id:id
            },
            include:{
                Item:true
            }
        })
    }
    async getItemThumbNails(item_id: string): Promise<thumb_nails[]> {
        return await this.prisma.thumb_nails.findMany({
            where:{
                item_id
            }
        })
    }
}

export default ShopsRepository