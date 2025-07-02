import {
  articles,
  books,
  chats,
  events,
  items,
  orderItems,
  orderItemStatus,
  orders,
  periodicals,
  rooms,
  sermons,
  thumb_nails,
  userRooms,
  users,
  userStatus,
} from "@prisma/client";
import {
  cevent,
  cuser,
  gUser,
  genRes,
  libSelector,
  paperSelector,
} from "./types";
import { acList, filePaths } from "../types/service.types";
import { boolean } from "joi";

interface IuserInterface {
  createUser(user: cuser, actor:string): Promise<users>;
  getUser(user: gUser): Promise<users | null>;
  deleteUser(phone: string, actor:string): Promise<string>;
  getUserById(id: string): Promise<users | null>;
  updateUser(user:users, actor:string):Promise<users>
  signInUser(email:string,password:string,):Promise<users | null>
  lockAccount(id:string, actor:string):Promise<users | null>
  searchUser(user?:userUpdate):Promise<users[]>
  filterUser(user?:userUpdate):Promise<users[]>
}
interface IEvents{
  createEvent(event:cevent, base64?:string):Promise<events>
  getEvents():Promise<events[]>
}
interface Ishops {
  createOrder(order:orders, orderItems:orderItems[], owner_id:string):Promise<orders>
  getItems():Promise<items[]>
  createItem(item:items, thumb_nails?:thumb_nails[]):Promise<items>
  changeOrderStatus(orderId:string, status:orderItemStatus):Promise<orders | null>
  getUserOrders(userId:string):Promise<orders[]>
}
interface Irooms{
  createRoom(room:rooms, owner_id?:string):Promise<rooms>
  addChat(room_id:string, message:string, sender_id:string):Promise<chats>
  getUserRooms(user_id:string):Promise<userRooms[]>
  getRoomChats(room_id:string):Promise<chats[]>
  joinRoom(user_id:string, room_id:string):Promise<userRooms>
}
interface IPeriodicals{
  createPeriodicals(p:any):Promise<periodicals>
  createSermons(p:any):Promise<sermons>
  getSermons():Promise<sermons[]>
  getBooks():Promise<books[]>
  getArticles():Promise<articles[]>
  createBook(book:books):Promise<books>
  getPeriodicals():Promise<periodicals[]>
  createArticles(item:Omit<articles, 'id'>):Promise<articles>
}

type userUpdate = {
  [key in keyof users]?:string | number | boolean | userStatus | Date
}
interface IuserService {
  createUser(user: cuser, actor:string): Promise<users>;
  deleteUser(phone: string, actor:string): Promise<string>;
  searchUser(user?:userUpdate):Promise<users[]>
  filterUser(email?:string, phone?:string):Promise<users | null>
  getUser(userId:string):Promise<users | null>
  signInUser(email:string,password:string,):Promise<users>
  updateUser(user:userUpdate, actor:string):Promise<users>
  lockAccount(id:string, actor:string):Promise<users | null>
  filterUserSearch(user?:userUpdate):Promise<users[]>
  signInSso(user:any):Promise<users | null>

}
interface IstartUp {
  addBlackList(phone: string, token: string): void;
}
interface IFileHandler {
  filePersistor (tempName:string,file:string, filePath:filePaths):string | null
  deleteFile(name:string):void
}
export {
  IuserInterface,
  IuserService,
  IFileHandler,
  IstartUp,
  userUpdate,
  Irooms,
  IEvents,
  Ishops,
  IPeriodicals
};
