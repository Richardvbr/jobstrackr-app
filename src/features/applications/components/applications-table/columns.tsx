import { createColumnHelper } from '@tanstack/react-table';

import { formatDate } from '@/utils/date';
import {
  ApplicationStatus,
  ApplicationStatusType,
  ApplicationTableRow,
} from '@/features/applications';
import { Icons } from '@/components';
import styles from './styles.module.scss';
import { currencies } from '@/utils/currency';

const columnHelper = createColumnHelper<ApplicationTableRow>();

export const columns = [
  columnHelper.accessor('edit', {
    header: 'Edit',
    cell: () => <Icons.Edit />,
    enableSorting: false,
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('position', {
    header: 'Position',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <ApplicationStatus status={info.getValue() as ApplicationStatusType} />,
  }),
  columnHelper.accessor('work_model', {
    header: 'Work model',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('salary', {
    header: 'Salary',
    cell: (info) => {
      const currency = info.row.original.salary_currency?.toUpperCase();
      const currencySymbol: string = currencies[currency as keyof typeof currencies].symbol;

      return <p>{`${currencySymbol}${info.getValue()}`}</p>;
    },
  }),
  columnHelper.accessor('employment_type', {
    header: 'Employment',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('link', {
    header: 'Link',
    cell: (info) => {
      if (!info.getValue()) return null;

      return (
        <a href={info.getValue() ?? ''} target='_blank' className={styles.link}>
          <p>View</p>
          <Icons.ExternalLink />
        </a>
      );
    },
  }),
  columnHelper.accessor('via', {
    header: 'Via',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('applied_at', {
    header: 'Applied at',
    cell: (info) => {
      const date = new Date(info.getValue() ?? '');
      const formattedDate = formatDate(date);

      return <p>{formattedDate}</p>;
    },
  }),
];
