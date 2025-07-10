import express, { Request, Response } from "express";
import { userService } from "../services";
import { cuser, errorEnums } from "../types";
import Logger from "../../startup/logger";
import { customErrorChecker, UserErrors } from "../errors";
import { fileHandler } from "../../services_layer/files";
import { IRequest } from "../../types/service.interface";
import { userUpdate } from "../interface";
import FileUploadError from "../errors/fileupload";
import appConfig from "../../config.ts";
import authLayer from "../../services_layer/auth/auth";
import { users } from "@prisma/client";

const logger = new Logger("accounts controller");
const accountsController = express.Router();

//create a user
const createUser = async (req: IRequest, res: Response) => {
  const { name, email, phone } = req.body;
  if (!email || !name || !phone)
    return res
      .status(400)
      .json({ message: errorEnums.FIELDS });

  const user: cuser = {
    email,
    phone,
    name
  };
  try {
    let newUser = await userService.createUser(user, '7a8c1084-be58-44fb-9511-b64efda75304');
    const token = authLayer.signToken(newUser)
    res.status(200).json({
      message: 'user created',
      data: token
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ error: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const updateUser = async (req: IRequest, res: Response) => {
  const user = req.user
  if ( !user) return res.status(400).json({ message: errorEnums.FIELDS })
  try {
    
    const u = await userService.updateUser(req.body, user?.id);
    const token = authLayer.signToken(u)
    res.status(200).json({ message: 'user updated', data: token });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const searchUser = async (req: IRequest, res: Response) => {
  try {
    const user = await userService.searchUser(req.query);
    res.status(200).json({ message: 'users', filters: req.query, data: user });
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
    console.log('error : ', err)
  }
};


const updatePassword = async (req: IRequest, res: Response) => {
  const actor = req.user
  const { password } = req.body
  if (!password || !actor) return res.status(400).json({ message: errorEnums.FIELDS })
  try {
    let user
    res.status(200).json({ message: 'password updated', data: user });
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
  }
};

const lockAccount = async (req: IRequest, res: Response) => {
  const actor = req.user
  const { userId } = req.body
  if (!userId || !actor) return res.status(400).json({ message: errorEnums.FIELDS })
  try {
    const user = await userService.lockAccount(userId, actor.id);

    res.status(200).json({ message: 'account locked', data: user });
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
  }
};

const getUser = async (req: IRequest, res: Response) => {
  const userId = req.query.id
  if (!userId) return res.status(400).json({ message: errorEnums.FIELDS })
  try {
    const user = await userService.getUser(userId as string);
    if (!user) throw new UserErrors()

    const dToken = authLayer.signToken(user)
    res.status(200).json({ message: 'user found', token: dToken });
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
  }
};

const filterUserSearch = async (req: IRequest, res: Response) => {
  const user = req.query
  const actor = req.user
  if (!user) return res.status(400).json({ message: errorEnums.FIELDS })
  try {
    const user = await userService.filterUserSearch(req.query as { [key: string]: any } as userUpdate);
    res.status(200).json({ message: 'user filter', data: { ...req.query, data: user } });
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
  }
};


const signInUser = async (req: IRequest, res: Response) => {
  const {email} = req.body
  if (!email) return res.status(400).json({ message: errorEnums.FIELDS })
  try {
    const user = await userService.signInUser(email, 'password');
    const token = authLayer.signToken(user)
    res.status(200).json({ message: 'user authenticated', data: token});
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
  }
};

const postUserActivity = async (req: IRequest, res: Response) => {
  const {userId, timeStamp, activity } = req.body;
  if (!userId || !timeStamp || !activity)
    return res.status(400).json({ message: errorEnums.FIELDS }); 
  try {
     await userService.postUserActivity(userId, activity, timeStamp);
    res.status(200).json({ message: 'logged user activity'});
  } catch (error: any) {
    const err = customErrorChecker(error);
    if (err) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: errorEnums.SERVER });
    logger.genError(error.message);
  }
}

export { filterUserSearch, postUserActivity, searchUser,signInUser, getUser, lockAccount, updatePassword, createUser, updateUser, };
