import mongoose, { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemSchema = new Schema(
  {
    image: { type: String, default: "" },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema], default: [] },
    extraIngredientPrices: { type: [ExtraPriceSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
