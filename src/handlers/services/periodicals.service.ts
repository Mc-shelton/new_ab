import { articles, books, events, periodicals, PrismaClient, sermons } from "@prisma/client";
import { IEvents, IPeriodicals } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";

@injectable()
class PeriodicalsService implements IPeriodicals{
    constructor(
        @inject("periodicalsRepo") private readonly periodicalsRepo:IPeriodicals
    ){}
    async createPeriodicals(p: any): Promise<periodicals> {
       return await this.periodicalsRepo.createPeriodicals(p)
    }

    async getPeriodicals(): Promise<periodicals[]> {
        return await this.periodicalsRepo.getPeriodicals()
    }
    async createSermons(p: any): Promise<sermons> {
        return await this.periodicalsRepo.createSermons(p)
    }
    async getSermons(): Promise<sermons[]> {
        return await this.periodicalsRepo.getSermons()
    }
    async getBooks(): Promise<books[]> {
        return await this.periodicalsRepo.getBooks()
    }
    async createBook(book: books): Promise<books> {
        return await this.periodicalsRepo.createBook(book)
    }
    async getArticles(): Promise<articles[]> {
        return await this.periodicalsRepo.getArticles()
    }
    async createArticles(item: any): Promise<articles> {
        return await this.periodicalsRepo.createArticles(item)
    }
}

export default PeriodicalsService