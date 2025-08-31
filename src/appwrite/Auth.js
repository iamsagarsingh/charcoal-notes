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

  // password-reset
  // 1. user gives url page 1.
  // 2. appwrite sends email to the user.
  // 3. on clicking the url by user -> page 2 where secret and userId is verifed.
  // 4. if all good then user gets the whole page 2 where he can make another request to reset the password.

  async recoverPassword(email){
    try{
      const emailStatus = await this.account.createRecovery(
        email,
        "https://charcoal-notes.vercel.app/reset-password" // destination page where user lands after clicking on emailed password reset link.
      )
      return emailStatus
    }
    catch(err){
      console.log("Error in recovering password.",err);
    }
  }

  async updatePasswordRecovery(userId,secret,password){
    try{
      await this.account.updateRecovery(userId,secret,password)
    }
    catch{
      console.log("Update Recovery Password error");
    }
  }

}

export const authService = new AuthServices();
