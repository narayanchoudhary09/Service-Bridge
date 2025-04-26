import { Client, Storage } from "appwrite";

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').
  setProject(import.meta.env.VITE_APP_WRITE_PROJECTID);

const storage = new Storage(client);

export async function uploadImage(file) {
  try {
    const response = await storage.createFile(import.meta.env.VITE_APP_WRITE_IMAGES, ID.unique(), file);
    return response;
  }
  catch (error) {
    return error;
  }
}
export async function deleteImage(fileId) {
  try {
    const response = await storage.deleteFile(import.meta.env.VITE_APP_WRITE_IMAGES, fileId);
    return response;
  } catch (error) {
    return error;
  }
}

export async function updateImage(fileId) {
  try {
    const response = await storage.updateFile(import.meta.env.VITE_APP_WRITE_IMAGES, fileId);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getFile(fileId) {
  try {
    const response = await storage.getFilePreview(import.meta.env.VITE_APP_WRITE_IMAGES, fileId);
    return response.href;
  } catch (error) {
    return error;
  }
}

