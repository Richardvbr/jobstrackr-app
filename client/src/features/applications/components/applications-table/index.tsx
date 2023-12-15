import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import type { Application } from "@/types/application";
import Table from "@/components/table";
import columns from "./columns";
import styles from "./styles.module.scss";
import { useApplicationStore } from "../..";

type ApplicationsTable = {
  data: Application[];
  searchQuery: string;
};

export const ApplicationsTable = ({ data, searchQuery }: ApplicationsTable) => {
  const [shownResults, setShownResults] = useState<number | string>(
    data.length
  );

  const { openModal, setActiveApplication } = useApplicationStore(
    useShallow((state) => ({
      openModal: state.openEditApplicationModal,
      setActiveApplication: state.setActiveApplication,
    }))
  );

  const totalResults = data?.length;

  useEffect(() => {
    setShownResults(data?.length);
  }, [data]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.count}>
        {"Showing"} <strong>{shownResults}</strong> {"of"}{" "}
        <strong>{totalResults}</strong> {"results"}
      </div>
      <div className={styles.table}>
        <Table
          stickyHeader
          onEditClick={(data) => {
            openModal();
            setActiveApplication(data);
          }}
          data={data ?? []}
          columns={columns}
          searchValue={searchQuery}
          setShownResults={setShownResults}
        />
      </div>
    </section>
  );
};
