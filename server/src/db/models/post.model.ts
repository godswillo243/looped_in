import { IPost } from "models";
import { model, Schema } from "mongoose";

const postSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
    imageUrls: [String],
    visibility: {
      type: String,
      enum: ["public", "connections", "private"],
      default: "public",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reposts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const PostModel = model<IPost>("Post", postSchema);

export default PostModel;
