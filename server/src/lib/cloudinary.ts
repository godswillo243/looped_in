import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config/env";

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  cloud_name: CLOUDINARY_CLOUD_NAME,
});

export const uploadImage = (image: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, result) => {
      if (err || !result) return reject(err);
      resolve(result.secure_url);
    });
  });
};

export function deleteImageByUrl(url: string) {
  return new Promise((resolve, reject) => {
    const publicId = url.split("/").pop()?.split(".")[0];
    console.log(publicId);

    if (!publicId) {
      console.error("Could not extract public_id from URL.");
      return;
    }
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) {
        console.log(err);

        return reject(err);
      }
      console.log("here also");

      resolve(result);
    });
  });
}

export default cloudinary;
