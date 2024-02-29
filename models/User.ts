import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      // required: true,
      validate: (pass: String) => {
        if (!pass.length || pass.length < 5) {
          new Error("Password must be atleast 5 characters");
          return;
        }
      },
    },
    image: { type: String, default: "" },
    // phone: { type: String, default: "" },
    // streetAddress: { type: String, default: "" },
    // postalCode: { type: String, default: "" },
    // city: { type: String, default: "" },
    // country: { type: String, default: "" },
    // admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.post("validate", (user) => {
  const notHashedPassword = user.password || "";
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User = models?.User || model("User", UserSchema);
