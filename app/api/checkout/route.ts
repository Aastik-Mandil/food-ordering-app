import { metadata } from "@/app/layout";
import { MenuItem } from "@/models/MenuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req: any) {
  await mongoose.connect(process.env.MONGODB_URL || "");
  const { cartProducts, address } = await req.json();

  const session = await getServerSession();
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  let stripeLineItems: any = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo?.basePrice;
    if (cartProduct?.size) {
      const size = productInfo?.sizes?.find(
        (size: any) =>
          size?._id?.toString() === cartProduct?.size?._id?.toString()
      );
      productPrice += size?.price || 0;
    }
    if (cartProduct?.extras?.length > 0) {
      for (const cartProductExtraThings of cartProduct?.extras) {
        const extraThingInfo = productInfo?.extraIngradientPrices?.find(
          (extra: any) =>
            extra?._id?.toString() === cartProductExtraThings?._id?.toString()
        );
        productPrice += extraThingInfo?.price || 0;
      }
    }

    let productName = cartProduct?.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url: `${
      process.env.NEXTAUTH_URL
    }/orders/${orderDoc._id.toString()}?clear-cart=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: { metadata: { orderId: orderDoc._id.toString() } },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });

  return Response.json(stripeSession?.url);
}
