import { useMemo } from 'react';
import { Table } from '@/components';
import type { Application } from '@/types/application';
import styles from './styles.module.scss';

type CompareTable = {
  data: Application[];
};

export function CompareTable({ data }: CompareTable) {
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

  // Add property/comparison column
  const columns = useMemo(() => {
    let appColumns = data.map((_, index) => ({
      header: `Application ${index + 1}`,
      accessorKey: `app${index + 1}`,
      enableSorting: false,
    }));

    return [{ header: 'Property', accessorKey: 'property', enableSorting: false }, ...appColumns];
  }, [data]);

  // Transpose data to layout data horizontally for easy comparison
  const tableData = useMemo(() => {
    return properties.map((property) => {
      let row = { property: property.header };
      data.forEach((app, index) => {
        // @ts-ignore
        row[`app${index + 1}`] = app[property.accessor];
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
