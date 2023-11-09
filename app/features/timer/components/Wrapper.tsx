import type { FC, ReactNode } from "react";
import { clsx } from "clsx";
import { Card } from "react-daisyui";

type Props = {
  isBorderRed: boolean;
  children: ReactNode;
};

export const Wrapper: FC<Props> = ({ isBorderRed, children }) => (
  <Card
    className={clsx("border-2", {
      "border-black dark:border-slate-400": !isBorderRed,
      "border-red-700": isBorderRed,
    })}
    bordered={false}
  >
    {children}
  </Card>
);
