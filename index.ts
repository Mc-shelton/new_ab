import "reflect-metadata";
import express from "express";
import Logger from "./src/startup/logger";
import { registerServer } from "./src/startup/registerip";
import appConfig from "./src/config.ts";
import { prismaSetup } from "./src/startup/db";
import { routerSetup } from "./src/startup/router";
import { getUsersConsumer } from "./src/rabbitmq/consumers/example";
import { shopsRepository, userRepository } from "./src/handlers/repositories";
import https from "https";
import fs from "fs";
import { consumeMessageWithResponse } from "./src/rabbitmq";
import { prismaClient } from "./src/prisma";
import socketSetup from "./src/startup/socket";
import http from "http";
import { periodicalsService } from "./src/handlers/services";
import { uploadToFtp } from "./src/services_layer/ftp";
import path from "path";
import { items } from "@prisma/client";
// import './src/BFF/misc/convert_to_mp3'
const app = express();
const logger = new Logger("index");
const PORT = appConfig.app.PORT;

const sslKey = fs.readFileSync("./ssl/key.pem");
const sslCrt = fs.readFileSync("./ssl/certificate.pem");

routerSetup(app);
logger.unCought();

// const server = http.createServer(app)
const server = https.createServer(
  {
    key: sslKey,
    cert: sslCrt,
  },
  app
);

socketSetup(server);
// logger.unCought()
server.listen(PORT, async () => {
  prismaSetup();
  logger.genLog("app listening on port", PORT, "SERVER", "LOG");
  const remoteFileName = path.basename("./2.png");

  let items: Omit<items, "id">[] = [
    {
      name: "Roselle Hibiscus",
      description:
        "Roselle hibiscus (Hibiscus sabdariffa), commonly enjoyed as a tea or juice, is rich in vitamin C, anthocyanins, and other antioxidants that support overall health. It is widely known for helping lower blood pressure and cholesterol, promoting heart health, and aiding in blood sugar regulation. Traditionally, it has also been used as a mild diuretic and digestive aid, reducing bloating and supporting liver function. Its anti-inflammatory and immune-boosting properties make it useful for fighting infections, easing menstrual discomfort, and improving skin health. However, it should be taken with caution by people on blood pressure or diabetes medication, and it’s generally not recommended during pregnancy due to possible uterine effects.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/hibiscus.jpeg",
      inStore: 50,
    },
    {
      name: "Chamomile",
      description:
        "Chamomile is a calming herb traditionally taken as a tea to relieve stress, anxiety, and insomnia. It contains antioxidants such as apigenin, which promote relaxation, support digestive health, and ease stomach upsets. Chamomile also has anti-inflammatory and antimicrobial properties, making it helpful for soothing skin irritations and boosting the immune system. While generally safe, it should be used cautiously by people allergic to plants in the daisy family.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/chamomile.jpeg",
      inStore: 50,
    },
    {
      name: "Molasses",
      description:
        "Molasses, a byproduct of sugarcane or sugar beet processing, is a nutrient-rich natural sweetener. Unlike refined sugar, it contains iron, calcium, magnesium, and potassium, which support bone health, blood production, and energy levels. It is sometimes used as a natural remedy for anemia and menstrual discomfort due to its iron content. However, because it is still high in sugar, it should be consumed in moderation.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/molasses.jpeg",
      inStore: 50,
    },
    {
      name: "Honey",
      description:
        "Honey is a natural sweetener with antimicrobial and antioxidant properties. It has long been used for wound healing, soothing sore throats, and boosting immunity. Rich in enzymes, trace minerals, and natural sugars, honey provides quick energy while also supporting digestive and skin health. Raw, unprocessed honey is considered the most beneficial, but it should not be given to infants under one year due to the risk of botulism.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/honey.jpeg",
      inStore: 50,
    },
    {
      name: "Ashwagandha",
      description:
        "Ashwagandha (Withania somnifera) is a powerful adaptogenic herb used in traditional medicine to reduce stress, improve sleep, and enhance energy. It supports brain health, boosts immunity, and may help balance hormones, particularly by lowering cortisol levels. Ashwagandha is also studied for improving strength, stamina, and fertility. While generally safe, it should be used cautiously in people with thyroid disorders or those taking sedatives.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/ashwagandha.jpeg",
      inStore: 50,
    },
    {
      name: "Jaggery",
      description:
        "Jaggery is a traditional unrefined sweetener made from sugarcane or palm sap, valued for its mineral content including iron, magnesium, and potassium. It provides quick energy while also supporting digestion, cleansing the liver, and helping manage anemia. In many cultures, jaggery is taken after meals to aid digestion and as a natural detoxifier. Though healthier than refined sugar, it is still calorie-dense and should be used in moderation.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/jaggery.jpeg",
      inStore: 50,
    },
    {
      name: "Moringa",
      description:"Moringa (Moringa oleifera), often called the “miracle tree,” is highly valued for its exceptional nutritional and medicinal benefits. Its leaves are rich in vitamins A, C, and E, along with calcium, potassium, protein, and powerful antioxidants that help protect the body against oxidative stress. Traditionally, moringa is used to boost energy, support immunity, and improve digestion. It may help lower blood sugar and cholesterol levels, promote heart health, and reduce inflammation. The seeds and pods are also beneficial, with detoxifying and antimicrobial properties. Because of its dense nutrient profile, moringa is often used to combat malnutrition, especially in children and nursing mothers. While generally safe, it should be taken in moderation, as very high doses may affect blood pressure or blood sugar.",
      price: "100",
      image_url: "https://adventband.org/bucket/shops/moringa_.jpeg",
      inStore: 50,
    },
  ];

  // prismaClient.items.createMany({ data: items}).then(res=>{
  //   logger.genLog('items added to shops')
  // }).catch(err=>{
  //   logger.genLog('error adding items', err)
  // })

  // prismaClient.items.findMany().then((res) => {
  //   for (let i = 0; i < res.length; i++) {
  //     let item = res[i];
  //     let item_update = items.find((itm) => itm.name === item.name) as items;

  //     prismaClient.thumb_nails.create({
  //       data:{
  //         item_id: item.id,
  //         url: item.image_url || ""
  //       }
  //     }).then(res=>{
  //       logger.genLog('thumbnail added for', res.id)
  //     }).catch(err=>{
  //       logger.genLog('error adding thumbnail', err)
      // })
  //     prismaClient.items
  //       .update({
  //         where: { id: item.id },
  //         data: item_update,
  //       })
  //       .then((res) => {
  //         logger.genLog("item updated", res.name);
  //       })
  //       .catch((err) => {
  //         logger.genLog("error updating item", err);
  //       });
    // }
  // });
});
