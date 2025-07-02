import { events, items, orderItems, orderItemStatus, orders, PrismaClient, thumb_nails } from "@prisma/client";
import { IEvents, Ishops, IuserInterface } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";
import ShopsRepository from "../repositories/shops.repo";
import { mail, receivedMail } from "../../services_layer/pings/invoice";
import { invoiceData, invoiceItems, receivedData } from "../../types/service.types";
import { getDate, getTime } from "../../services_layer/utils/getDate";
import randomiz from "../../services_layer/utils/randomiz";
import { UserErrors } from "../errors";

@injectable()
class ShopsService implements Ishops {
  constructor(
    @inject("shopsRepo") private readonly shopsRepo: ShopsRepository,
    @inject("userRepo") private readonly userRepo: IuserInterface
  ) {}
  async createItem(item: items, thumb_nails: thumb_nails[]): Promise<items> {
    await this.shopsRepo.createItemThumbNails(thumb_nails);
    return await this.shopsRepo.createItem(item);
  }

  async getItems(): Promise<items[]> {
    return await this.shopsRepo.getItems();
  }

  async createOrder(order: orders, orderItems:orderItems[], owner_id:string): Promise<orders> {
    const customer = await this.userRepo.getUserById(owner_id)
    if(!customer) throw new UserErrors(owner_id)
    const now = new Date()
    const gen = `#AHC_${randomiz(4)}`.toUpperCase()
    // generate order_id
    // TODO: check/update instores
    order.order_id = gen
    order.customer_id = owner_id
    const neworder = await  this.shopsRepo.createOrder(order)
    //send mail here
    const recMailData:receivedData = {
        customer_name:customer.name || "guest",
        customer_email:customer.email,
        invoice_id:gen,
        created_at: getDate(now),
    }
    receivedMail(recMailData)
    let nOrderItems:any = orderItems.map(item=>{{
        let t = {
          item_id:item.id,
          order_id:neworder.order_id,
          quantity:item.quantity
        }
        return t
    }})
    await this.shopsRepo.createOrderItem(nOrderItems)
    let newItems =  await this.shopsRepo.getOrderItemsByOrderId(neworder.order_id)
    let nItems:invoiceItems[] = newItems.map(l=>{
        let item:invoiceItems = {
            name:(l as any).Item.name,
            quantity:l.quantity.toString(),
            price:(l as any).Item.price
        }
        return item
    })
    const due = new Date()
    due.setDate(due.getDate() + 7)
    const invoiceData:invoiceData = {
        ...recMailData,
        due_at: getDate(due),
        customer_id:customer.id.slice(6).toUpperCase(),
        time:getTime(due),
        items:nItems,
        total:newItems.reduce((a,b)=>a+parseInt((b as any).Item.price), 0).toString(),
        location:'Town CBD',
    }
    mail(invoiceData)
    return neworder
  }

  async getUserOrders(userId: string): Promise<orders[]> {
      return await this.shopsRepo.getUserOrders(userId)
  }
  async changeOrderStatus(orderId: string, status: orderItemStatus): Promise<orders | null> {
      return await this.shopsRepo.changeOrderStatus(orderId, status)
  }
}

export default ShopsService;
