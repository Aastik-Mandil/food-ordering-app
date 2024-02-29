import mongoose from "mongoose";
import { MenuItem } from "@/models/MenuItem";
import { isAdmin } from "../../auth/[...nextauth]/route";

export async function GET(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const urls = req.url.split("/");
  const _id = urls[urls.length - 1];

  let data = {};
  if (await isAdmin()) {
    data = await MenuItem.findOne({ _id });
  }
  return Response.json(data);
}
