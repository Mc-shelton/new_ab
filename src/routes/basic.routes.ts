import { Router } from "express"
import { accountsController } from "../handlers/controllers"
const basicAuthRoutes = Router()

basicAuthRoutes.post("/", accountsController.signInUser)
export default basicAuthRoutes