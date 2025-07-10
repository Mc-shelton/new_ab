import { Response } from "express";
import { IRequest } from "../../types/service.interface";
import { errorEnums } from "../types";
import { eventsService } from "../services";
import { customErrorChecker } from "../errors";
import Logger from "../../startup/logger";

const logger = new Logger("events controller");
const createEvent = async (req: IRequest, res: Response) => {
  const {
    title,
    image,
    description,
    organizer,
    location,
    repeat,
    date,
  } = req.body;
  if (
    [title, image, description, organizer, location, repeat, date].some(
      (v) => !v
    )
  )
    return res.status(400).json({ message: errorEnums.FIELDS });

  try {
    req.body.date = new Date(req.body.date)
    const u = await eventsService.createEvent(req.body);
    res.status(200).json({ message: "event updated", data: u });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};


const getEvents = async (req: IRequest, res: Response) => {
    try {
      const events = await eventsService.getEvents();
      res.status(200).json({ message: "events", data: events});
    } catch (err: any) {
      const error = customErrorChecker(err);
      if (error) return res.status(400).json({ message: err.message });
      res.status(500).json({ message: errorEnums["SERVER"] });
      logger.genError(err.message);
    }
  };
  
export {
    createEvent,
    getEvents
}