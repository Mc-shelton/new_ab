import { NextFunction, Response } from "express";
import { access, acl, errorEnums, methods } from "../types";
import { IRequest } from "../../types/service.interface";
const accessControl = (action: methods, access?: access) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {

      let user = req.user as any
      let acls: acl = user?.acls
      if (!acls) acls = {
        can_read: true,
      }
      if (acls && acls[action] == true) return next();
      console.log(req.user)
      console.log(acls)
      return res.status(403).json({
        message: errorEnums.PROFILE,
      });
    } catch (err) {
      res.status(500).json({
        message: errorEnums.SERVER,
      });
    }
  }
};

export default accessControl;
