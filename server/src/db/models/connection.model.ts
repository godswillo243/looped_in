import { model, Schema } from "mongoose";

const connectionSchema = new Schema<IConnection>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const ConnectionModel = model<IConnection>("Connection", connectionSchema);

export default ConnectionModel;
