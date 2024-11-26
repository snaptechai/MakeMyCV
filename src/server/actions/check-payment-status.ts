"use server";

import axios from "axios";

type PaymentResponse = {
  result: string;
};

export const checkPaymentStatus = async (coupon: string, random_id: string) => {
  const formData = new FormData();
  formData.append("coupon_code", coupon);
  formData.append("id", random_id);

  try {
    const { data, status } = await axios.post<PaymentResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/web/index.php?r=cv/paymentstatus",
      formData,
    );
    console.log(data);
    if (status !== 200) {
      return {
        status: null,
      };
    }
    return {
      status: data.result,
    };
  } catch (e) {
    return {
      status: null,
    };
  }
};
