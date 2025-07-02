import { Router } from "express";
import { eventsController } from "../handlers/controllers";

const eventsRouter = Router()

eventsRouter.post("/", eventsController.createEvent)
eventsRouter.get("/",  eventsController.getEvents)

export default eventsRouter