import { inject, injectable } from "tsyringe";
import { IuserInterface, IuserService, userUpdate } from "../interface";
import ping_event from "../events/pings.sub";
import { hashChallenge } from "../../encryption";
import appConfig from "../../config.ts";
import { cuser, genRes } from "../types";
import { InvalidQueryError, UserErrors } from "../errors";
import { joinerDataType } from "../../types/service.types";
import BridgeError from "../errors/idbrigde";
import syncObjectUpdate from "../../services_layer/utils/updater";
import { UsedEmail } from "../errors/userErrors";
import { users } from "@prisma/client";

@injectable()
class UserService implements IuserService {
  constructor(@inject("userRepo") private readonly userRepo: IuserInterface) {}
  async createUser(user: cuser, actor: string): Promise<users> {
    const existingUser = await this.userRepo.getUser({
      email: user.email,
    });

    if (existingUser) throw new UsedEmail(user.email);
    if(!user.name) user.name = ''
    let names = user.name.trim().split(" ");
    names = names.map((l) => {
      return l[0].toUpperCase() + l.slice(1);
    });
    let firstName = names[0];
    user.name = names.join(" ");
    const newUser = await this.userRepo.createUser(user, actor);
    //emit emial
    let d: joinerDataType = {
      name: firstName,
      email: newUser.email,
    };
    ping_event.emit("send_mail", d);
    return newUser;
  }

  async deleteUser(phone: string, actor: string): Promise<string> {
    const id = this.userRepo.deleteUser(phone, actor);
    return id;
  }

  async getUser(userId: string): Promise<users | null> {
    return await this.userRepo.getUserById(userId);
  }

  async searchUser(user?: userUpdate): Promise<users[]> {
    return await this.userRepo.searchUser(user);
  }

  async signInUser(email: string, password: string): Promise<users> {
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ) as unknown as string;
    let p = hashChallenge(appConfig.app.CRYPTO_SECRET, password);
    const user = await this.userRepo.signInUser(email, p);
    if (!user) {
      let nU: any = {
        email,
      };
      const newUser = await this.userRepo.createUser(nU, 'actor');
      return newUser
    }
    return user;
  }

  async lockAccount(id: string, actor: string): Promise<users | null> {
    return await this.userRepo.lockAccount(id, actor);
  }
  async updateUser(user: userUpdate, actor: string): Promise<users> {
    //pick user
    const userData = await this.userRepo.getUserById(user.id as string);
    if (!userData) throw new UserErrors(user.id as string);
    const userMaped = syncObjectUpdate<users>(userData, user as users);
    //send update
    return await this.userRepo.updateUser(userMaped, actor);
  }

  async filterUser(email?: string, phone?: string): Promise<users | null> {
    return await this.userRepo.getUser({ email, phone });
  }
  async filterUserSearch(user?: userUpdate): Promise<users[]> {
    return await this.userRepo.filterUser(user);
  }

  async signInSso(user: any): Promise<users | null> {
    return await this.userRepo.getUser({ email: "email", phone: "phone" });
  }
}

export default UserService;
