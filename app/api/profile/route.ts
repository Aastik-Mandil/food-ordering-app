import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return Response.json(false);
    }
    filter = { email };
  }

  await User.updateOne(filter, { name, image });
  const user = await User.findOne(filter);

  await UserInfo.findOneAndUpdate({ email: user?.email }, otherUserInfo, {
    upsert: true,
  });
  return Response.json(true);
}

export async function GET(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return Response.json({});
    }
    filter = { email };
  }

  const user = await User.findOne(filter).lean();
  const userInfo = await UserInfo.findOne({ email: user?.email }).lean();
  return Response.json({ ...userInfo, ...user });
}
