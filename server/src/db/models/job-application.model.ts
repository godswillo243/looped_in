import { model, Schema } from "mongoose";

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resumeUrl: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const JobApplicationModel = model<IJobApplication>(
  "JobApplication",
  jobApplicationSchema
);

export default JobApplicationModel;
