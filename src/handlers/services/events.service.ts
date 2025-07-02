import { events, PrismaClient } from "@prisma/client";
import { IEvents } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";
import { uploadToFtp } from "../../services_layer/ftp";
import getFileExtension from "../../services_layer/utils/getExtension";
@injectable()
class EventsService implements IEvents {
  constructor(@inject("eventsRepo") private readonly eventsRepo: IEvents) {}
  async createEvent(event: cevent): Promise<events> {
    const { base64, ...rest } = event as any;
    const tempDir = path.join(__dirname, "tmp");
    fs.mkdirSync(tempDir, { recursive: true });

    const extension = getFileExtension(base64);
    const fileName = `${v4().toString()}.${extension}`;
    const localPath = path.join(tempDir, fileName);

    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(localPath, buffer);
    console.log(localPath);
    const result = await uploadToFtp({
      localPath,
      remoteFileName: fileName,
      remoteFolder: "/events",
    });
    rest.image = `https://adventband.org/bucket/events/${fileName}`

    // Clean up temp file
    fs.unlinkSync(localPath);
    return await this.eventsRepo.createEvent(rest);
  }

  async getEvents(): Promise<events[]> {
    return await this.eventsRepo.getEvents();
  }
}

export default EventsService;
