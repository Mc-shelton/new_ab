import { Router } from "express";
import { eventsController, periodicalController } from "../handlers/controllers";

const periodicalRouter = Router()

periodicalRouter.post("/", periodicalController.createPeriodicals)
periodicalRouter.get("/",  periodicalController.getPeriodicals)
periodicalRouter.get("/sermons", periodicalController.getSermons)
periodicalRouter.get("/books", periodicalController.getBooks)
periodicalRouter.get("/articles", periodicalController.getArticles)

export default periodicalRouter