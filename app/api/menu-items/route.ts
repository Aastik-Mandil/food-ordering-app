import mongoose from "mongoose";
import { MenuItem } from "@/models/MenuItem";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  let menuItemDoc = {};
  if (await isAdmin()) {
    const data = await req.json();
    menuItemDoc = await MenuItem.create(data);
  }
  return Response.json(menuItemDoc);
}

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const data = await MenuItem.find({});
  return Response.json(data);
}

export async function PUT(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  let menuItemDoc = {};
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    menuItemDoc = await MenuItem.findOneAndUpdate({ _id }, data, {
      upsert: true,
    });
  }
  return Response.json(menuItemDoc);
}

export async function DELETE(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (await isAdmin()) {
    await MenuItem.deleteOne({ _id });
  }
  return Response.json(true);
}
