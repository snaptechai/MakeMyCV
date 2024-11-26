import React from "react";
import { db } from "@/db";
import { banner } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";
import moment from "moment";
import Countdown from "./ui/countdown";

export default async function Banner() {
  const bannerData = await db.query.banner.findFirst({
    where: and(
      eq(banner.bannerStatus, "On"),
      gte(banner.endDate, moment(new Date()).format("YYYY-MM-DD")),
    ),
    columns: {
      backgroundColor: true,
      fontColor: true,
      description: true,
      timmerStatus: true,
      endDate: true,
    },
  });
  if (!bannerData) return <></>;
  return (
    <div className="h-16 max-lg:h-24">
      <div
        style={{
          backgroundColor: bannerData.backgroundColor,
          color: bannerData.fontColor,
        }}
        className="fixed inset-0 z-50 flex h-16 w-full flex-col items-center justify-center bg-primary text-primary-foreground max-lg:h-24 lg:flex-row"
      >
        <h4 className="mx-5 text-center text-xs font-semibold lg:text-base">
          {bannerData.description}
        </h4>

        {bannerData.timmerStatus === "On" && bannerData.endDate && (
          <div className="mx-5 max-lg:mt-2 lg:ml-5">
            <Countdown endDate={bannerData.endDate} />
          </div>
        )}
      </div>
    </div>
  );
}
