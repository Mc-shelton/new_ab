import { Response } from "express";
import { IRequest } from "../../types/service.interface";
import { errorEnums } from "../types";
import { eventsService, periodicalsService } from "../services";
import { customErrorChecker } from "../errors";
import Logger from "../../startup/logger";

const logger = new Logger("events controller");
const createPeriodicals = async (req: IRequest, res: Response) => {
  const {
    title,
    name,
    type,
    avTime,
    forDate,
  } = req.body;
  if (
    [title, name, type, avTime, forDate].some(
      (v) => !v
    )
  )
    return res.status(400).json({ message: errorEnums.FIELDS });

  try {
    req.body.forDate = new Date(forDate);
    const u = await periodicalsService.createPeriodicals(req.body);
    res.status(200).json({ message: "periodical updated", data: u });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};


const getPeriodicals = async (req: IRequest, res: Response) => {
    try {
      const events = await periodicalsService.getPeriodicals();
      res.status(200).json({ message: "periodicals", data: events});
    } catch (err: any) {
      const error = customErrorChecker(err);
      if (error) return res.status(400).json({ message: err.message });
      res.status(500).json({ message: errorEnums["SERVER"] });
      logger.genError(err.message);
    }
  };

const getSermons = async (req: IRequest, res: Response) => {
  try {
    const sermons = await periodicalsService.getSermons();
    res.status(200).json({ message: "sermons", data: sermons});
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getBooks = async (req: IRequest, res: Response) => {
  try {
    const sermons = await periodicalsService.getBooks();
    res.status(200).json({ message: "books", data: sermons});
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};


const getArticles = async (req: IRequest, res: Response) => {
  try {
    const sermons = await periodicalsService.getArticles();
    res.status(200).json({ message: "artcles", data: sermons});
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};
  
export {
    getPeriodicals,
    createPeriodicals,
    getSermons,
    getArticles,
    getBooks
}