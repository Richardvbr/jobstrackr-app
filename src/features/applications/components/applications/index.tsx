import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useParams } from 'react-router-dom';

import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
  useApplicationsQuery,
} from '@/features/applications';
import { Icons, Button, Input, Card } from '@/components';
import styles from './styles.module.scss';

export function Applications() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  let { action } = useParams();
  const openModal = useApplicationStore((state) => state.openNewApplicationModal);
  const { data: applications } = useApplicationsQuery();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  if (action === 'new-application') {
    openModal();
  }

  return (
    <Card title='Your applications' shadow>
      <Button onClick={openModal}>
        <Icons.Plus />
        New application
      </Button>
      <Input
        className={styles.search}
        label='Search for an application'
        name='application-search-table'
        placeholder='Search for an application'
        handleChange={(e) => setSearchQuery(e.target.value)}
      />
      <ApplicationsTable data={applications ?? []} searchQuery={debouncedSearchQuery} />
      <ApplicationModal />
    </Card>
  );
}
