import { useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import { useApplicationsContentQuery } from "@/features/cms";
import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
  getApplicationsQuery,
} from "@/features/applications";
import { Icons, Button, Input } from "@/components";
import styles from "./styles.module.scss";

export const ApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const openModal = useApplicationStore(
    (state) => state.openNewApplicationModal
  );
  const { data: applications } = getApplicationsQuery();
  const { data: labels } = useApplicationsContentQuery();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <section>
      <h1>{labels?.title}</h1>
      <Button onClick={openModal}>
        <Icons.Plus />
        {labels?.newApplication}
      </Button>
      <Input
        className={styles.search}
        label='Search for an application'
        name='application-search-table'
        placeholder={labels?.applicationSearch}
        handleChange={(e) => setSearchQuery(e.target.value)}
      />
      <ApplicationsTable
        data={applications ?? []}
        searchQuery={debouncedSearchQuery}
      />
      <ApplicationModal />
    </section>
  );
};
