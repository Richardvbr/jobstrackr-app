import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useApplicationStore } from '@/stores/applicationStore';
import { Table } from '@/components/shared';
import { columns } from './columns';
import type { Application } from '@/types/application';
import styles from './styles.module.scss';

type ApplicationsTable = {
  data: Application[];
  searchQuery: string;
  loading: boolean;
};

export function ApplicationsTable({ data, searchQuery, loading = false }: ApplicationsTable) {
  const [shownResults, setShownResults] = useState<number | string>(data?.length);

  const { openModal, setActiveApplication } = useApplicationStore(
    useShallow((state) => ({
      openModal: state.openEditApplicationModal,
      setActiveApplication: state.setActiveApplication,
    }))
  );

  const totalResults = data?.length;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && !totalResults) {
    return <p>No results found</p>;
  }

  return (
    <section className={styles.wrapper}>
      <p className={styles.count}>
        Showing <strong>{shownResults}</strong> of <strong>{totalResults}</strong> results
      </p>
      <div className={styles.table}>
        <Table
          stickyHeader
          onEditClick={(data) => {
            openModal();
            setActiveApplication(data);
          }}
          data={data ?? []}
          columns={columns}
          searchValue={searchQuery}
          setShownResults={setShownResults}
        />
      </div>
    </section>
  );
}
