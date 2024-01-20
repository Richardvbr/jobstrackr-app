import type { SelectInputItem } from "@/types/elements";
import type { HTMLInputTypeAttribute } from "react";

type FormItem = {
  name:
    | "company"
    | "position"
    | "location"
    | "applied_at"
    | "salary"
    | "salary_currency"
    | "link"
    | "notes"
    | "via";
  label: string;
  required?: boolean;
  type: HTMLInputTypeAttribute;
};

export const formItems: FormItem[] = [
  {
    name: "company",
    label: "Company *",
    type: "text",
    required: true,
  },
  {
    name: "position",
    label: "Position *",
    type: "text",
    required: true,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
  },
  {
    name: "applied_at",
    label: "Applied at *",
    type: "date",
    required: true,
  },
  {
    name: "salary",
    label: "Salary (range)",
    type: "text",
  },
  {
    name: "salary_currency",
    label: "Salary currency",
    type: "text",
  },
  {
    name: "link",
    label: "Link",
    type: "text",
  },
  {
    name: "notes",
    label: "Notes",
    type: "text",
  },
  {
    name: "via",
    label: "Via/source",
    type: "text",
  },
];

export const statusInput: SelectInputItem = {
  name: "status",
  label: "Status",
  options: [
    {
      value: "applied",
      label: "Applied",
    },
    {
      value: "processing",
      label: "Processing",
    },
    {
      value: "denied",
      label: "Denied",
    },
    {
      value: "accepted",
      label: "Accepted",
    },
    {
      value: "offered",
      label: "Offered",
    },
    {
      value: "withdrawn",
      label: "Withdrawn",
    },
    {
      value: "ghosted",
      label: "Ghosted",
    },
  ],
};

export const employmentTypeInput: SelectInputItem = {
  name: "employment_type",
  label: "Employment type",
  options: [
    {
      value: "office",
      label: "Office",
    },
    {
      value: "remote",
      label: "Remote",
    },
    {
      value: "hybrid",
      label: "Hybrid",
    },
  ],
};

export const workModelInput: SelectInputItem = {
  name: "work_model",
  label: "Work model",
  options: [
    {
      value: "full-time",
      label: "Full-time",
    },
    {
      value: "part-time",
      label: "Part-time",
    },
    {
      value: "freelance",
      label: "Freelance",
    },
    {
      value: "internship",
      label: "Internship",
    },
    {
      value: "other",
      label: "Other",
    },
  ],
};
