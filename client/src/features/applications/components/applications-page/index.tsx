import { useState } from "react";

import useDebounce from "@/hooks/useDebounce";

import type { Application } from "@/types/application";
import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
} from "@/features/applications";
import { Plus } from "@/components/icons";
import Button from "@/components/button";
import Input from "@/components/form-fields/input";
import styles from "./styles.module.scss";

type ApplicationsPageProps = {
  data: Application[];
};

export const ApplicationsPage = ({ data }: ApplicationsPageProps) => {
  const openModal = useApplicationStore(
    (state) => state.openNewApplicationModal
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <section>
      <Button onClick={openModal}>
        <Plus />
        Add a new application
      </Button>
      <Input
        className={styles.search}
        label='Search for an application'
        name='application-search-table'
        placeholder='Enter your search query'
        handleChange={(e) => setSearchQuery(e.target.value)}
      />
      <ApplicationsTable data={data || []} searchQuery={debouncedSearchQuery} />
      <ApplicationModal />
    </section>
  );
};
