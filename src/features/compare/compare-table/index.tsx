import { useMemo } from 'react';
import type { Application } from '@/types/application';
import { capitalizeFirstLetter } from '@/utils/text';
import { formatDate } from '@/utils/date';
import { Table } from '@/components';
import styles from './styles.module.scss';

type CompareTableProps = {
  data: Application[];
};

export function CompareTable({ data }: CompareTableProps) {
  const properties = useMemo(
    () => [
      { header: 'Company', accessor: 'company' },
      { header: 'Position', accessor: 'position' },
      { header: 'Salary', accessor: 'salary' },
      { header: 'Salary currency', accessor: 'salary_currency' },
      { header: 'Location', accessor: 'location' },
      { header: 'Status', accessor: 'status' },
      { header: 'Work model', accessor: 'work_model' },
      { header: 'Employment type', accessor: 'employment_type' },
      { header: 'Via', accessor: 'via' },
      { header: 'Link', accessor: 'link' },
      { header: 'Applied at', accessor: 'applied_at' },
    ],
    []
  );

  const columns = useMemo(() => {
    const appColumns = data.map((_, index) => ({
      header: `Application ${index + 1}`,
      accessorKey: `app${index + 1}`,
      enableSorting: false,
    }));

    return [{ header: 'Property', accessorKey: 'property', enableSorting: false }, ...appColumns];
  }, [data]);

  // Transpose data to layout horizontally for easy comparison
  const tableData = useMemo(() => {
    return properties.map(({ header, accessor }) => {
      const row: { [key: string]: string | undefined } = { property: header };

      data.forEach((app, index) => {
        const value = app[accessor as keyof Application];

        if (accessor === 'applied_at' && typeof value === 'string') {
          const date = new Date(value);
          const formattedDate = formatDate(date);
          row[`app${index + 1}`] = formattedDate;
        } else if (accessor === 'link' && typeof value === 'string') {
          row[`app${index + 1}`] = value;
        } else if (typeof value === 'string') {
          row[`app${index + 1}`] = capitalizeFirstLetter(value);
        }
      });

      return row;
    });
  }, [data, properties]);

  return (
    <section className={styles.table}>
      <Table stickyHeader data={tableData ?? []} columns={columns} />
    </section>
  );
}
