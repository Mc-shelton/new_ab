import { container } from "tsyringe";
import UserService from "./users.service";
import {  eventsRepository, periodicalsRepository, roomsRepository, shopsRepository, userRepository } from "../repositories";
import EventsService from "./events.service";
import PeriodicalsService from "./periodicals.service";
import ShopsService from "./shops.service";
import RoomsService from "./rooms.service";

const userServiceContainer = container.register('userRepo', {useValue:userRepository})
const eventsServiceContainer = container.register('eventsRepo', {useValue:eventsRepository})
const periodicalsServiceContainer = container.register("periodicalsRepo", {useValue:periodicalsRepository})
const shopsServiceContainer = container.register("shopsRepo", {useValue:shopsRepository})
shopsServiceContainer.register("userRepo", {useValue:userRepository})
const roomsServiceContainer = container.register("roomsRepo", {useValue:roomsRepository})

const userService = userServiceContainer.resolve(UserService)
const eventsService = eventsServiceContainer.resolve(EventsService)
const periodicalsService = periodicalsServiceContainer.resolve(PeriodicalsService)
const shopsService = shopsServiceContainer.resolve(ShopsService)
const roomsService = roomsServiceContainer.resolve(RoomsService)

export {
    userService,
    shopsService,
    eventsService,
    roomsService,
    periodicalsService
}