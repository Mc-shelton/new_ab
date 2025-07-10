import { Router } from "express";
import { estateController } from "../handlers/controllers";

const estateRoute = Router()

estateRoute.get('/', estateController.getLessons)
estateRoute.get('/quarterlies', estateController.getLessons)
estateRoute.get('/pdf', estateController.getPdf)
estateRoute.get('/quarterlies/books', estateController.getQuarterliesBooks)
estateRoute.get('/egw', estateController.getEgwEstate)
estateRoute.get('/egw/folder', estateController.getEgwFolder)
estateRoute.get('/pioneers', estateController.getPioneer)
estateRoute.get('/pioneers/estate', estateController.getPioneerEstate)
estateRoute.get('/egw/content', estateController.getEgwContent)


export default estateRoute