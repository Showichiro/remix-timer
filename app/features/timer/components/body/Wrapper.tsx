import type { FC, ReactNode } from "react";
import { Card } from "react-daisyui";

export const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Card.Body>{children}</Card.Body>
);
