import { Response } from "express";
import { IRequest } from "../../types/service.interface";
import ShopsService from "../services/shops.service";
import { shopsService } from "../services";
import { errorEnums } from "../types";
import { orders } from "@prisma/client";
import { customErrorChecker } from "../errors";
import Logger from "../../startup/logger";

const logger = new Logger("shops contoller")
const createOrder = async (req: IRequest, res: Response) => {
  const { order_items } = req.body;
  console.log(req.body)
  const user = req.user;
  if(!order_items) return res.status(400).json({message:errorEnums.FIELDS})
  if (!user)
    return res
      .status(401)
      .json({ message: "please sign in to access this resource" });
  const order: any = {
    customer_id: user.id,
    order_id: "placeholder",
  };
  try {
    const nOrder = await shopsService.createOrder(order, order_items, user.id);
    res.status(200).json({ message: "order created", data: nOrder });
  } catch (err: any) {
    console.log(err)
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const createItem = async (req: IRequest, res: Response) => {
  const { item, thumb_nails } = req.body;
  try {
    const nItem = await shopsService.createItem(item, thumb_nails);
    res.status(200).json({ message: "item created", data: nItem });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};


const getItems = async (req: IRequest, res: Response) => {
  try {
    const items = await shopsService.getItems()
    res.status(200).json({ message: "shop items", data: items });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getItemThumbNails = async (req: IRequest, res: Response) => {
  const {item_id} = req.query
  try {
    const items_nails = await shopsService.getItemThumbNails(item_id as string)
    res.status(200).json({ message: "item thumbnails", data: items_nails });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getUserOrder = async (req: IRequest, res: Response) => {
  const user = req.user;
  if (!user)
    return res
      .status(401)
      .json({ message: "please sign in to access this resource" });
  
  try {
    const orders = await shopsService.getUserOrders(user.id)
    res.status(200).json({ message: "user orders", data: orders });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const changeOrderStatus = async (req: IRequest, res: Response) => {
  const {status, order_id} = req.body
  if(!status || !order_id) return res.status(400).json({message:errorEnums.FIELDS})
  try {
    const order = await shopsService.changeOrderStatus(order_id, status)
    res.status(200).json({ message: "status changed", data: order });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

export {
  createOrder,
  createItem,
  getItems,
  getUserOrder,
  changeOrderStatus,
  getItemThumbNails
}