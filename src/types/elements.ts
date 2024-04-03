export type ButtonType = "primary" | "secondary" | "danger";

export type ElementSizes = "xs" | "s" | "m" | "l" | "xl";

export type SelectInputItem = {
  name: string;
  label: string;
  options: {
    value: string | number | undefined;
    label: string;
  }[];
};
