import cn from "clsx";

import { ApplicationStatus as ApplicationStatusType } from "@/types/application";
import { capitalizeFirstLetter } from "@/utils/text";
import styles from "./styles.module.scss";

type ApplicationStatusProps = {
  status: ApplicationStatusType;
};

export const ApplicationStatus = ({ status }: ApplicationStatusProps) => {
  const lowercaseStatus = status?.toLowerCase();

  const classes = cn(styles.status, {
    [styles[lowercaseStatus]]: lowercaseStatus && lowercaseStatus !== "status",
  });

  return (
    <div className={classes}>
      <p>{capitalizeFirstLetter(lowercaseStatus || "None")}</p>
    </div>
  );
};
