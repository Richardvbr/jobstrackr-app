"use client";

import { useState } from "react";

import useDebounce from "@/hooks/useDebounce";

import type { ApplicationsContent } from "@/features/cms";
import type { Application } from "@/types/application";
import {
  ApplicationsTable,
  ApplicationModal,
  useApplicationStore,
} from "@/features/applications";
import { Icons, Button, Input } from "@/components";
import styles from "./styles.module.scss";

type ApplicationsPageProps = {
  data: Application[];
  content: ApplicationsContent;
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
        <Icons.Plus />
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
