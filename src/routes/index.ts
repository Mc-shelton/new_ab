import express, { NextFunction, Request, Response } from "express";
import path from "path";
import accountsRouter from "./accounts.routes";
import { oAuthCtonroller } from "../handlers/controllers";
import oAuthRouter from "./oath.routes";
import basicAuthRoutes from "./basic.routes";
import eventsRouter from "./events.routes";
import periodicalRouter from "./periodical.router";
import shopsRouter from "./shops.routes";
import roomsRouter from "./rooms.routes";
import estateRoute from "./estate.routes";
import staticRoutes from "./static.routes";
const apiv1 = express.Router();

apiv1.use(
  "/static",
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join("assets", "files"), {
    setHeaders: (res, path) => {
      res.setHeader("Content-Type", "image/png"); // Adjust the content type based on your image type
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Adjust caching settings as needed
    },
  }) 
);
apiv1.use("/static", staticRoutes)
apiv1.use("/estate", estateRoute);
apiv1.use("/accounts", accountsRouter);
apiv1.use("/basicAuth", basicAuthRoutes);
apiv1.use("/events", eventsRouter);
apiv1.use("/periodicals", periodicalRouter)
apiv1.use('/rooms', roomsRouter)
apiv1.use('/shops', shopsRouter)
apiv1.use("/oauth", oAuthRouter);
apiv1.use("/", basicAuthRoutes);

export default apiv1;
