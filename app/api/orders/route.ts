import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import { UserInfo } from "@/models/UserInfo";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");

  const session = await getServerSession();
  const userEmail = session?.user?.email;

  const url = new URL(req.url);
  let _id = url.searchParams.get("_id");

  let admin = await isAdmin();

  let filter = {};
  if (admin) {
    filter = {};
  } else {
    filter = { userEmail };
  }
  if (_id) {
    filter = { ...filter, _id };
  }
  let orders = await Order.find(filter);
  if (_id) {
    if (orders?.length > 0) {
      orders = orders[0];
    } else {
      orders = {};
    }
  }

  return Response.json(orders);
}
