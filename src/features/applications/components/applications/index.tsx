import { useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
  getApplicationsQuery,
} from "@/features/applications";
import { dashboardRoute } from "@/routes";

import { Icons, Button, Input, Card } from "@/components";

import styles from "./styles.module.scss";

export function Applications() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { action } = dashboardRoute.useSearch();
  const openModal = useApplicationStore((state) => state.openNewApplicationModal);
  const { data: applications } = getApplicationsQuery();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  if (action === "new-application") {
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
