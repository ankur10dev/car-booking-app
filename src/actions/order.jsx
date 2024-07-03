"use server";

import connect from "@/lib/database";
import { sendEmail } from "@/lib/sendEmail";
import Order from "@/models/Order";

export const orderedMail = async (id) => {
  try {
    await connect();
    const getOrder = await Order.findById(id);

    // Send email to customer
    await sendEmail({
      order: getOrder,
      email: getOrder.email,
      subject: "Your Booking Confirmation",
      message: `Hi there, your booking has been confirmed.`,
    });

    // Send email to admin or another recipient
    await sendEmail({
      order: getOrder,
      email: "exzion024@example.com",
      subject: "New Booking Notification",
      message: `A new booking has been made.`,
    });

    return getOrder;
  } catch (error) {
    console.error("Error sending order email:", error);
    throw new Error("Failed to send order email");
  }
};
