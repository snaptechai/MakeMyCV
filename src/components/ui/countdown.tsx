"use client";

import React from "react";
import moment from "moment";

export default function Countdown({ endDate }: { endDate: string }) {
  const now = new Date();
  const end = moment(endDate);
  const duration = moment.duration(end.diff(now));
  const [timeLeft, setTimeLeft] = React.useState({
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  });

  setInterval(() => {
    const now = new Date();
    const end = moment(endDate);
    const duration = moment.duration(end.diff(now));
    setTimeLeft({
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    });
  }, 1000);

  return (
    <CountdownComponent
      days={timeLeft.days}
      hours={timeLeft.hours}
      minutes={timeLeft.minutes}
      seconds={timeLeft.seconds}
    />
  );
}

const format = (value: number) => value.toString().padStart(2, "0");

const CountdownComponent = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div className="grid h-full grid-cols-4 items-center gap-2 text-center text-black">
      <div className="flex h-fit flex-col justify-center rounded-lg bg-white p-1">
        <span className="text-xs font-bold">
          <span suppressHydrationWarning>{format(days)}</span>
        </span>
        <span className="text-xs font-light">days</span>
      </div>
      <div className="flex h-fit flex-col justify-center rounded-lg bg-white p-1">
        <span className="text-xs font-bold">
          <span suppressHydrationWarning>{format(hours)}</span>
        </span>
        <span className="text-xs font-light">hours</span>
      </div>
      <div className="flex h-fit flex-col justify-center rounded-lg bg-white p-1">
        <span className="text-xs font-bold">
          <span suppressHydrationWarning>{format(minutes)}</span>
        </span>
        <span className="text-xs font-light">min</span>
      </div>
      <div className="flex h-fit flex-col justify-center rounded-lg bg-white p-1">
        <span className="text-xs font-bold">
          <span suppressHydrationWarning>{format(seconds)}</span>
        </span>
        <span className="text-xs font-light">sec</span>
      </div>
    </div>
  );
};
