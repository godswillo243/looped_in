import { INotification } from "models";
import { model, Schema } from "mongoose";

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
      enum: ["comment", "like", "job", "job-application", "connection"],
      text: String,
    },
  },
  { timestamps: true }
);

const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
