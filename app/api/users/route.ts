import { User } from "@/models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URL || "");

  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  }
  return Response.json([]);
}
