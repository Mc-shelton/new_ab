import express, { Request, Response } from "express";
import { accountsController } from "../handlers/controllers";
import { userRepository } from "../handlers/repositories";
import accessControl from "../handlers/middlewares/actl";
const accountsRouter = express.Router();

accountsRouter.post("/user", accountsController.updateUser);
accountsRouter.get("/user/filter", accountsController.filterUserSearch)
accountsRouter.get("/user", accountsController.getUser)
accountsRouter.put("/user/password", accountsController.updatePassword)
accountsRouter.post("/user/edit",  accountsController.updateUser)
accountsRouter.get("/user/search", accountsController.searchUser)
accountsRouter.post("/user/activity", accountsController.searchUser)

export default accountsRouter;
