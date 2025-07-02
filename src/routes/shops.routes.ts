import { Router } from "express";
import { shopsController } from "../handlers/controllers";

const shopsRouter = Router()
shopsRouter.post('/items', shopsController.createItem)
shopsRouter.post("/orders", shopsController.createOrder)
shopsRouter.get("/items", shopsController.getItems)
shopsRouter.get("/orders", shopsController.getUserOrder)
shopsRouter.put("/orders", shopsController.changeOrderStatus)

export default shopsRouter