export const conf = {
    APPWRITE_URI: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    APPWRITE_PROJECTID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}