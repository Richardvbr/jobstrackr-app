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
  Icon?: any;
  onClick?: () => void;
};
