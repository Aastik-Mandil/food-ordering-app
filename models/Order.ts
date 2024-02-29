import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: {
      type: String,
    },
    phone: { type: String },
    streetAddess: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    cartProducts: { type: Object },
    paid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
