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

export type SelectInputItem = {
  name: string;
  label: string;
  options: {
    value: string | undefined;
    label: string;
  }[];
};

export const formItems: FormItem[] = [
  {
    name: "company",
    label: "Company",
    type: "text",
    required: true,
  },
  {
    name: "position",
    label: "Position",
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
    label: "Applied at ",
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
      value: "Applied",
      label: "Applied",
    },
    {
      value: "Processing",
      label: "Processing",
    },
    {
      value: "Denied",
      label: "Denied",
    },
    {
      value: "Accepted",
      label: "Accepted",
    },
    {
      value: "Offered",
      label: "Offered",
    },
    {
      value: "Withdrawn",
      label: "Withdrawn",
    },
    {
      value: "Ghosted",
      label: "Ghosted",
    },
  ],
};

export const employmentTypeInput: SelectInputItem = {
  name: "employment_type",
  label: "Employment type",
  options: [
    {
      value: "Office",
      label: "Office",
    },
    {
      value: "Remote",
      label: "Remote",
    },
    {
      value: "Hybrid",
      label: "Hybrid",
    },
  ],
};

export const workModelInput: SelectInputItem = {
  name: "work_model",
  label: "Work model",
  options: [
    {
      value: "Full-time",
      label: "Full-time",
    },
    {
      value: "Part-time",
      label: "Part-time",
    },
    {
      value: "Freelance",
      label: "Freelance",
    },
    {
      value: "Internship",
      label: "Internship",
    },
    {
      value: "Other",
      label: "Other",
    },
  ],
};
