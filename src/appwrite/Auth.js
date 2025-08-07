import { Client, Account, ID } from "appwrite";
import { conf } from "../conf/conf";

class AuthServices {
  account;
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URI)
      .setProject(conf.APPWRITE_PROJECTID);
    this.account = new Account(this.client);
  }

  async Signup(name, email, password) {
    try {
      const userAcc = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return { status: true, userAcc };
      
    } catch (err) {
      if (err.code === 409) {
        return { status: false, message: "email already exists!" };
      } else {
        return { status: false, message: "login failed!" };
      }
    }
  }
  async Login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      return { status: false, message: "email already exists!" };
    }
  }

  async getAcc() {
    try {
      return await this.account.get();
    } catch {
      console.log("GetAcc error.");
    }
  }

  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch {
      console.log("Logout Error.");
    }
  }
}

export const authService = new AuthServices();
