import { container } from "tsyringe";
import UserRepository from "./users.repo";
import { prismaClient } from "../../prisma";
import EventsRepository from "./events.repo";
import PeriodicalsRepository from "./periodicles.repo";
import ShopsRepository from "./shops.repo";
import RoomsRepository from "./rooms.repol";

const prismaContainer = container.register('prisma', {useValue:prismaClient})

const userRepository = prismaContainer.resolve(UserRepository)
const eventsRepository = prismaContainer.resolve(EventsRepository)
const periodicalsRepository = prismaContainer.resolve(PeriodicalsRepository)
const shopsRepository = prismaContainer.resolve(ShopsRepository)
const roomsRepository = prismaContainer.resolve(RoomsRepository)

export {
    userRepository,
    roomsRepository,
    shopsRepository,
    eventsRepository,
    periodicalsRepository
}

