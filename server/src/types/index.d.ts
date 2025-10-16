import mongoose, { Document } from "mongoose";

declare global {
  interface IUser extends Document {
    uid: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    headline: string;
    location: string;
    about: string;
    skills: string[];
    education: {
      school: string;
      course: string;
      degree: string;
      startYear: number;
      endYear: number;
    }[];
    resumeUrls: string[];
    emailVerification: { code: string; expiresAt: Date; done: boolean };
    resetPasswordToken: string;
  }

  interface IConnection extends Document {
    user: mongoose.Schema.Types.ObjectId;
    targetUser: mongoose.Schema.Types.ObjectId;
    status: "pending" | "accepted" | "blocked";
  }
  interface INotification extends Document {
    user: mongoose.Schema.Types.ObjectId;
    entityId: mongoose.Schema.Types.ObjectId;
    entityType: "comment" | "like" | "job" | "job-application" | "connection";
    text: string;
    status: "unread" | "read";
  }

  interface IPost extends Document {
    user: mongoose.Schema.Types.ObjectId;
    content: string;
    imageUrls: string[];
    visibility: "public" | "connections" | "private";
    likes: mongoose.Schema.Types.ObjectId[];
    reposts: mongoose.Schema.Types.ObjectId[];
  }
  interface IComment extends Document {
    post: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    parentComment: mongoose.Schema.Types.ObjectId | null;
    content: string;
  }
  interface IJob extends Document {
    uploadedBy: mongoose.Schema.Types.ObjectId;
    companyName: string;
    companyLogoUrl: string;
    title: string;
    description: string;
    tags: string[];
    skillsRequired: string[];
    deadline: Date;
  }
  interface IJobApplication extends Document {
    user: mongoose.Schema.Types.ObjectId;
    job: mongoose.Schema.Types.ObjectId;
    resumeUrl: string;
    status: "pending" | "accepted" | "rejected";
  }
}
