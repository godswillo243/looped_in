import { model, Schema } from "mongoose";

const jobSchema = new Schema<IJob>(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    companyName: {
      type: String,
      required: true,
    },
    companyLogoUrl: String,
    description: {
      type: String,
      required: true,
    },
    skillsRequired: [String],
    tags: [String],
    deadline: Date,
  },
  { timestamps: true }
);

const JobModel = model<IJob>("Job", jobSchema);

export default JobModel;
