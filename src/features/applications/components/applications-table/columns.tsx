import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "@/utils/date";
import {
  ApplicationStatus,
  ApplicationStatusType,
  ApplicationTableRow,
} from "@/features/applications";
import { Icons } from "@/components";
import styles from "./styles.module.scss";

const columnHelper = createColumnHelper<ApplicationTableRow>();

const columns = [
  columnHelper.accessor("edit", {
    header: "Edit",
    cell: () => <Icons.Edit />,
    enableSorting: false,
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <ApplicationStatus status={info.getValue() as ApplicationStatusType} />
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("work_model", {
    header: "Work model",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("salary", {
    header: "Salary",
    cell: (info) => {
      const currency = info.row.original.salary_currency;
      return <p>{`${info.getValue()} ${currency}`}</p>;
    },
    enableSorting: true,
  }),
  columnHelper.accessor("employment_type", {
    header: "Employment",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("link", {
    header: "Link",
    cell: (info) => (
      <a
        href={info.getValue() ?? undefined}
        target='_blank'
        className={styles.link}
      >
        <p>View</p>
        <Icons.ExternalLink />
      </a>
    ),
  }),
  columnHelper.accessor("via", {
    header: "Via",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("applied_at", {
    header: "Applied at",
    cell: (info) => {
      const date = new Date(info.getValue() ?? "");
      const formattedDate = formatDate(date);

      return <p>{formattedDate}</p>;
    },
    enableSorting: true,
  }),
];

export default columns;
