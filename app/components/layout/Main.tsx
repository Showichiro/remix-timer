import type { FC, ReactNode } from "react";

export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="p-2">{children}</main>
);
