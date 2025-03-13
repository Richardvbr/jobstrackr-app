import { useState } from 'react';

import { useToken } from '@/contexts/AuthContext';
import { useApplicationsQuery } from '@/data/application';
import { CompareForm } from './compare-form';
import { CompareTable } from './compare-table';

export function ComparePage() {
  const token = useToken();
  const { data: applications } = useApplicationsQuery(token);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const comparedApplications =
    applications?.filter(({ id }) => selectedApplications.includes(id)) ?? [];

  return (
    <section>
      <h1>Compare applications</h1>
      <CompareForm
        applications={applications ?? []}
        setSelectedApplications={setSelectedApplications}
      />
      {comparedApplications.length >= 1 && <CompareTable data={comparedApplications || []} />}
    </section>
  );
}
