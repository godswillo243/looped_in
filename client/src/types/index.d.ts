declare module "@types" {
  export interface IUser {
    uid: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
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
    exprience: {
      company: string;
      position: string;
      startYear: number;
      endYear: number;
    }[];
    resumeUrls: string[];
    emailVerification: { code: string; done: boolean };
    resetPasswordCode: string;
  }

  interface IConnection {
    sender: string | IUser;
    receiver: string | IUser;
    status: "pending" | "accepted" | "blocked";
  }
  interface INotification {
    user: string | IUser;
    entityId: string;
    entityType: "comment" | "like" | "job" | "job-application" | "connection";
    text: string;
    status: "unread" | "read";
  }

  interface IPost {
    user: string | IUser;
    content: string;
    imageUrls: string[];
    visibility: "public" | "connections" | "private";
    likes: string | IUser[];
    reposts: string | IUser[];
  }
  interface IComment {
    post: string | IPost;
    user: string | IUser;
    parentComment: string | null;
    content: string;
  }
  interface IJob {
    uploadedBy: string | IUser;
    companyName: string;
    companyLogoUrl: string;
    title: string;
    description: string;
    tags: string[];
    skillsRequired: string[];
    deadline: Date;
  }
  interface IJobApplication {
    user: string | IUser;
    job: string | IJob;
    resumeUrl: string;
    status: "pending" | "accepted" | "rejected";
  }
}
