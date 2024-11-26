"use server";

import axios from "axios";

type PaymentResponse = {
  result: string;
  payment: any;
};

export const getPaymentDetails = async (coupon: string, random_id: string) => {
  const formData = new FormData();
  formData.append("coupon_code", coupon);
  formData.append("id", random_id);

  try {
    const { data, status } = await axios.post<PaymentResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/web/index.php?r=cv/payhash",
      formData,
    );
    if (status !== 200) {
      return {
        error: "An error occurred",
        details: undefined,
      };
    }

    if (data.result !== "success") {
      return {
        error: "Something went wrong",
        details: undefined,
      };
    }

    return {
      error: undefined,
      details: data.payment,
    };
  } catch (e) {
    return {
      error: "An error occurred",
      details: undefined,
    };
  }
};
