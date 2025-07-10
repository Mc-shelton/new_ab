import { Router } from "express";
import { estateController } from "../handlers/controllers";

const staticRoutes = Router()

staticRoutes.get('/read/pdf', estateController.getPdf)

export default staticRoutes