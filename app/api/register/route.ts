import { User } from "../../../models/User";
import mongoose from "mongoose";

// MONGODB_URL

export async function POST(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const body = await req.json();
  const createdUser = await User.create(body);

  return Response.json(createdUser);
}
