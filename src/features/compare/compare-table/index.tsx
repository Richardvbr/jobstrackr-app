import type { Application } from '@/types/application';
import { Table } from '@/components';
import { columns } from './columns';

type CompareTable = {
  data: Application[];
};

export function CompareTable({ data }: CompareTable) {
  return (
    <section>
      <Table stickyHeader data={data ?? []} columns={columns} />
    </section>
  );
}
