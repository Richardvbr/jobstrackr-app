import { useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { getApplicationsContentQuery } from "@/features/cms";
import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
  getApplicationsQuery,
} from "@/features/applications";
import { Icons, Button, Input, Card } from "@/components";
import styles from "./styles.module.scss";

export function Applications() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const openModal = useApplicationStore(
    (state) => state.openNewApplicationModal
  );
  const { data: applications } = getApplicationsQuery();
  const { data: labels } = getApplicationsContentQuery();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <Card title='Your applications' shadow>
      <Button onClick={openModal}>
        <Icons.Plus />
        {labels?.newApplication}
      </Button>
      <Input
        className={styles.search}
        label={labels?.applicationSearch}
        name='application-search-table'
        placeholder={labels?.applicationSearch}
        handleChange={(e) => setSearchQuery(e.target.value)}
      />
      <ApplicationsTable
        data={applications ?? []}
        searchQuery={debouncedSearchQuery}
      />
      <ApplicationModal />
    </Card>
  );
}
