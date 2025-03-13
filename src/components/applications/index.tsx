import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

import { useToken } from '@/contexts/AuthContext';
import { useApplicationStore } from '@/stores/applicationStore';
import { useApplicationsQuery } from '@/data/application';
import { Icons, Button, Input, Card } from '@/components/shared';
import { ApplicationsTable } from './applications-table';
import { ApplicationModal } from './application-modal';
import styles from './styles.module.scss';

export function Applications() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchParams] = useSearchParams();
  const token = useToken();
  const openModal = useApplicationStore((state) => state.openNewApplicationModal);
  const { data: applications, isLoading } = useApplicationsQuery(token);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const action = searchParams.get('action');

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
      <ApplicationsTable
        data={applications ?? []}
        searchQuery={debouncedSearchQuery}
        loading={isLoading}
      />
      <ApplicationModal />
    </Card>
  );
}
