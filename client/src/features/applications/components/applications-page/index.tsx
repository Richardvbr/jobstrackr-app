import { useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
  useGetApplications,
} from "@/features/applications";
import { Icons, Button, Input } from "@/components";
import styles from "./styles.module.scss";
import { useGetApplicationsContent } from "@/features/cms";

export const ApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const openModal = useApplicationStore(
    (state) => state.openNewApplicationModal
  );
  const { data: applications } = useGetApplications();
  const { data: labels } = useGetApplicationsContent();

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
