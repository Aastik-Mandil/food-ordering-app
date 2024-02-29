import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    streetAddress: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
