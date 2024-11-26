"use server";

import axios from "axios";

type CheckCouponResponse = {
  result: string;
  val: number;
  t: "fcasucasduxiouasxb" | "pcnbadsickucfuycva";
};

export const checkCoupon = async (coupon: string, random_id: string) => {
  const formData = new FormData();
  formData.append("coupon_code", coupon);
  formData.append("id", random_id);

  try {
    const { data, status } = await axios.post<CheckCouponResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/web/index.php?r=coupon/validatecoupon",
      formData,
    );
    console.log(data);
    if (status !== 200) {
      return {
        error: "An error occurred",
        discount: 0,
      };
    }

    if (data.result !== "ok") {
      return {
        error: "Coupon code is invalid",
        discount: 0,
      };
    }

    if (data.result === "ok" && data.t === "fcasucasduxiouasxb") {
      return {
        error: undefined,
        discount: 100,
      };
    }

    return {
      error: undefined,
      discount: data.val,
    };
  } catch (e) {
    return {
      error: "An error occurred",
      discount: 0,
    };
  }
};
