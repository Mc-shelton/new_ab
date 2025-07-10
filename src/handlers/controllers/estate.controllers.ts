import { Response } from "express";
import { IRequest } from "../../types/service.interface";
import { errorEnums } from "../types";
import { shopsService } from "../services";
import { customErrorChecker } from "../errors";
import Logger from "../../startup/logger";
import axios from "axios";
import picker from "../../services_layer/utils/picker";

const logger = new Logger("estate controller");
const base_urls = {
  q: "https://sabbath-school.adventech.io/api/v2/",
  q1:"https://absg.sspmadventist.org/api/v3/en/ss/",
  e: "https://legacy.egwwritings.org/modules/writings/",
};
const getLessons = async (req: IRequest, res: Response) => {
  try {
    let books = await axios.get(`${base_urls.q}en/quarterlies/index.json`);
    if (!books.data)
      return res.status(400).json({
        message: "failed could not get resource",
      });
    const b_data = books.data
      .filter((l: any) => {
        if (!l.quarterly_group) return false;
        return l["quarterly_group"]["name"] == "Standard Adult";
      })
      .map((l: any, x: any) => {
        return picker(l, ["path", "title", "cover", "splash"]);
      });
    res.status(200).json({
      message: "lessons media",
      data: b_data,
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};
const getEgwEstate = async (req: IRequest, res: Response) => {
  try {
    // Make the request to the remote resource
    const response = await axios.get(`${base_urls.e}tree/treedata.php`);

    // Send only the response data to the client
    res.status(200).json({
      message: "estate media",
      data: response.data,
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getPioneer = async (req: IRequest, res: Response) => {
  try {
    // Make the request to the remote resource
    const response = await axios.get(
      `${base_urls.e}tree/treedata.php?parentnode=f_16`
    );

    // Send only the response data to the client
    res.status(200).json({
      message: "estate media",
      data: response.data,
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getPioneerEstate = async (req: IRequest, res: Response) => {
  const { node } = req.query;
  console.log("@@##########", node);
  try {
    // Make the request to the remote resource
    const response = await axios.get(
      `${base_urls.e}tree/treedata.php?parentnode=${node}`
    );
    // Send only the response data to the client
    res.status(200).json({
      message: "estate media",
      data: response.data,
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getEgwFolder = async (req: IRequest, res: Response) => {
  const { url } = req.query;
  try {
    // Make the request to the remote resource
    const response = await axios.get(
      `${base_urls.e}tree/treedata.php?parentnode=${url}`
    );

    // Send only the response data to the client
    res.status(200).json({
      message: "estate media",
      data: response.data,
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getEgwContent = async (req: IRequest, res: Response) => {
  const { id_pub, maxpuborder } = req.query;
  try {
    console.log("payload", req.query);
    // Make the request to the remote resource
    const response = await axios.get(
      `${base_urls.e}textview/getid_elementauto.php?id_pub=${id_pub}`
    );
    if (!response.data)
      return res.status(400).json({
        message: "failed could not get resource",
      });
    let retContent: any[] = [];
    let counter = 0;
    let id_el = response.data.id_elementauto;
    while (counter < response.data.maxpuborder) {
      const content = await axios.get(
        `${
          base_urls.e
        }writingsview/showrecords.php?startID=${id_el}&amount=${response.data.maxpuborder.toString()}&initload=true&mobile=0`
      );
      let mid = content.data.elements.middle;

      let lastMid = mid[mid.length - 1].id_elementauto;
      let lastOrd = mid[mid.length - 1].order;
      id_el = lastMid + 1;
      counter = lastOrd;
      retContent = [...retContent, ...content.data.elements.middle];
    }

    // Send only the response data to the client
    res.status(200).json({
      message: "estate media",
      data: {
        elements: {
          middle: retContent,
        },
      },
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getQuarterliesBooks = async (req: IRequest, res: Response) => {
  var { path } = req.query;
  if (!path)
    return res.status(400).json({
      message: errorEnums.FIELDS,
    });
  try {
    let books = await axios.get(`${base_urls.q}${path}/lessons/index.json`);
     let split = (path as string).split("/")
     path = split[split.length - 1]
    let books2 = await axios.get(`${base_urls.q1}${path}/pdf.json`);
    if (!books.data)
      return res.status(400).json({
        message: "failed could not get resource",
      });
    const b_data = books.data.map((l: any, x: any) => {
        l.src = books2.data.filter((b:any) => b.title == l.title)[0].src
      return picker(l, ["title", "start_date", "end_date", "path", "cover", "src"]);
    });
    res.status(200).json({
      message: "lessons media",
      data: b_data,
    });
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};

const getPdf = async (req: IRequest, res: Response) => {
  const { pdfUrl } = req.query;
  console.log("pdfUrl", pdfUrl);
  if (!pdfUrl)
    return res.status(400).json({
      message: errorEnums.FIELDS,
    });

  try {
    const response = await axios.get(`${pdfUrl}`, {
      responseType: "arraybuffer",
    });
    res.setHeader("Content-Type", "application/pdf");
    res.send(response.data);
  } catch (err: any) {
    const error = customErrorChecker(err);
    if (error) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: errorEnums["SERVER"] });
    logger.genError(err.message);
  }
};
export {
  getLessons,
  getPdf,
  getEgwFolder,
  getEgwContent,
  getQuarterliesBooks,
  getEgwEstate,
  getPioneer,
  getPioneerEstate,
};
