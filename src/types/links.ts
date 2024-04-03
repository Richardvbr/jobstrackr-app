import { ElementType } from "react";

export type LinkItemProps = {
  href?:
    | "/"
    | "/sign-in"
    | "/sign-up"
    | "/dashboard"
    | "/documents"
    | "/questions"
    | "/tips"
    | "/settings"
    | "/feedback"
    | string;
  label?: string;
  Icon?: ElementType;
  onClick?: () => void;
};
