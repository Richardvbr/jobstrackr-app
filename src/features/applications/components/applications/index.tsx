import { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        {t("applications.newApplication")}
      </Button>
      <Input
        className={styles.search}
        label={t("applications.search")}
        name='application-search-table'
        placeholder={t("applications.search")}
        handleChange={(e) => setSearchQuery(e.target.value)}
      />
      <ApplicationsTable data={applications ?? []} searchQuery={debouncedSearchQuery} />
      <ApplicationModal />
    </Card>
  );
}
