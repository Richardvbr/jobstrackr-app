import { ApplicationStatus as ApplicationStatusType } from "@/types/application";
import cn from "clsx";
import styles from "./styles.module.scss";
import { capitalizeFirstLetter } from "@/utils/text";

type ApplicationStatusProps = {
  status: ApplicationStatusType;
};

export const ApplicationStatus = ({ status }: ApplicationStatusProps) => {
  const lowercaseStatus = status?.toLowerCase();

  const classes = cn([styles.status], {
    [styles.denied]: lowercaseStatus === "denied",
    [styles.accepted]: lowercaseStatus === "accepted",
    [styles.applied]: lowercaseStatus === "applied",
    [styles.ghosted]: lowercaseStatus === "ghosted",
    [styles.offered]: lowercaseStatus === "offered",
    [styles.processing]: lowercaseStatus === "processing",
    [styles.withdrawn]: lowercaseStatus === "withdrawn",
  });

  return (
    <div className={classes}>
      <p>{capitalizeFirstLetter(lowercaseStatus || "None")}</p>
    </div>
  );
};
