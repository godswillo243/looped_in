import { Handler } from "express";
import UserModel from "../db/models/user.model";
import { createError } from "../lib/utils";
import { uploadImage } from "../lib/cloudinary";

export const editProfile: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findById((req as any).userId);
    if (!user) throw createError(404, "User not found!");

    const { firstName, lastName, location, headline, about, profilePicture } =
      req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.location = location || user.location;
    user.headline = headline || user.headline;
    user.about = about || user.about;

    if (profilePicture) {
      try {
        user.profilePictureUrl = await uploadImage(profilePicture);
      } catch (error) {
        throw createError(500, "Error uploading image");
      }
    }

    await user.save();

    res.status(200).json("Updated!");
  } catch (e) {
    next(e);
  }
};
export const getUser: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ uid: req.params.uid });

    if (!user) throw createError(404, "User not found!");
    const data = {
      _id: user._id,
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      skills: user.skills,
      resumeUrls: user.resumeUrls,
      education: user.education,
      exprience: user.exprience,
      createdAt: user.createdAt,
      location: user.location,
      headline: user.headline,
      about: user.about,
      profilePictureUrl: user.profilePictureUrl,
    };
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};
export const sendConnectionRequest: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findById((req as any).userId);

    if (!user) throw createError(404, "User not found!");

    res.status(200).json("Email sent!");
  } catch (e) {
    next(e);
  }
};
export const acceptConnectionRequest: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findById((req as any).userId);

    if (!user) throw createError(404, "User not found!");

    res.status(200).json("Email sent!");
  } catch (e) {
    next(e);
  }
};
