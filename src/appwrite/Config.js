import { conf } from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { authService } from "./Auth.js";

class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URI)
      .setProject(conf.APPWRITE_PROJECTID);
    this.databases = new Databases(this.client);
  }
  async createNote({ title, content, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          userId: String(userId),
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updateNote(noteId, { title, content }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        noteId,
        {
          title,
          content,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(noteId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        noteId
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getNote(noteId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        noteId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getAllNotes(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("userId", userId), // 🔍 filter by userId
          Query.orderDesc("$createdAt"), // 🕒 sort by newest first
        ]
      );
    } catch (error) {
      console.log("Appwrite service :: getAllNotes :: error", error);
      return false;
    }
  }
}

export const noteService = new Service();
