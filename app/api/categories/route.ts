import mongoose from "mongoose";
import { Category } from "@/models/Category";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  let categoryDoc = {};
  if (await isAdmin()) {
    const { name } = await req.json();
    categoryDoc = await Category.create({ name });
  }
  return Response.json(categoryDoc);
}

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const categories = await Category.find();
  return Response.json(categories);
}

export async function PUT(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  let categoryDoc = {};
  if (await isAdmin()) {
    const { name, _id } = await req.json();
    categoryDoc = await Category.findOneAndUpdate(
      { _id },
      { name },
      { upsert: true }
    );
  }
  return Response.json(categoryDoc);
}

export async function DELETE(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }
  return Response.json(true);
}
