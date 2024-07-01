"use server";

import Order from "@/models/Order";
import connect from "./database";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const PaymentMethod = async (body) => {
  try {
    await connect();
    const newOrder = await Order.create(body);

    const transformedItem = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.title,
          },
          unit_amount: body.price * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItem,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${newOrder._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
    });

    if (session) {
      console.log("Session URL: ", session.url); // Debugging line
      return session.url;
    } else {
      throw new Error("Failed to create a session");
    }
  } catch (error) {
    console.error("Error in PaymentMethod: ", error); // Improved error logging
    throw error; // Re-throw the error to handle it further up the chain if needed
  }
};
