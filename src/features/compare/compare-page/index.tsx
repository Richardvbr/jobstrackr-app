import { useState } from 'react';
import { useApplicationsQuery } from '@/features/applications';
import { CompareForm } from '../compare-form';

export function ComparePage() {
  const { data: applications } = useApplicationsQuery();
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  return (
    <section>
      <h1>Compare applications</h1>
      <CompareForm
        applications={applications ?? []}
        setSelectedApplications={setSelectedApplications}
      />
    </section>
  );
}
