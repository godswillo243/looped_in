import { IUser } from "models";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
    },
    location: {
      type: String,
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
    education: [
      {
        school: String,
        course: String,
        degree: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    resumeUrls: [String],
    emailVerification: {
      code: String,
      expiresAt: Date,
      done: {
        type: Boolean,
        default: false,
      },
    },
    resetPasswordCode: String,
  },
  { timestamps: true }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
