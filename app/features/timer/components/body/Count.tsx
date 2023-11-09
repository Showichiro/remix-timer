import clsx from "clsx";
import type { FC } from "react";
import { Countdown } from "react-daisyui";

export const Count: FC<{
  isTextColorRed: boolean;
  hours: number;
  minutes: number;
  seconds: number;
  onClick: () => void;
}> = ({ isTextColorRed, hours, minutes, seconds, onClick }) => (
  // eslint-disable-next-line tailwindcss/no-custom-classname
  <div onClick={onClick} className="timer-count">
    <div
      className={clsx("flex justify-center", {
        "text-red-700": isTextColorRed,
      })}
    >
      <Countdown value={hours} className="text-8xl xl:text-9xl" />
      h
      <Countdown value={minutes} className="text-8xl xl:text-9xl" />
      m
      <Countdown value={seconds} className="text-8xl xl:text-9xl" />s
    </div>
  </div>
);
