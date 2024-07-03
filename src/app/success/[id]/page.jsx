"use client";

import React, { useState, useEffect } from "react";
import { orderedMail } from "@/actions/order";

const Success = ({ params }) => {
  const [updateEmail, setUpdateEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedOrder = await orderedMail(params.id);
        setUpdateEmail(updatedOrder);
      } catch (error) {
        console.error("Failed to update email:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="grid items-center justify-center h-[90vh]">
      {updateEmail ? (
        <div className="flex justify-center items-center gap-10 flex-col">
          <img src="/success.png" className="w-40 h-40" alt="Success" />
          <h1 className="text-4xl text-green-500">Successful payment</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Success;
