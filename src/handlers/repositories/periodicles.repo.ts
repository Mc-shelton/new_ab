import { articles, books, events, periodicals, PrismaClient, sermons } from "@prisma/client";
import { IEvents, IPeriodicals } from "../interface";
import { cevent } from "../types";
import { inject, injectable } from "tsyringe";

@injectable()
class PeriodicalsRepository implements IPeriodicals{
    constructor(
        @inject("prisma") private readonly prisma:PrismaClient
    ){}
    async createPeriodicals(event: any): Promise<periodicals> {
        return await this.prisma.periodicals.create({
            data:event
        })
    }

    async getPeriodicals(): Promise<periodicals[]> {
        return await this.prisma.periodicals.findMany({
            orderBy:{
                forDate:"desc"
            }
        })
    }
    async getArticles(): Promise<articles[]> {
        return await this.prisma.articles.findMany()
    }
    async createArticles(item:articles):Promise<articles>{
        return await this.prisma.articles.create({
            data:item
        })
    }
    async createSermons(p: any): Promise<sermons> {
        return await this.prisma.sermons.create({
            data:p
        })
    }
    async getSermons(): Promise<sermons[]> {
        return await this.prisma.sermons.findMany()
    }
    async getBooks(): Promise<books[]> {
        return await this.prisma.books.findMany({
            where:{
                type:'abc'
            }
        })
    }
    async createBook(book:books): Promise<books> {
        return await this.prisma.books.create({
            data:book
        })
        
    }
}

export default PeriodicalsRepository