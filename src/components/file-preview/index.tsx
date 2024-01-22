import { fileTypeIcons, formatBytes, getFileExtension } from "@/utils/documents";

import styles from "./styles.module.scss";

type FilePreviewProps = {
  file: File;
};

export function FilePreview({ file }: FilePreviewProps) {
  const fileSize = formatBytes(file.size);
  const fileType = getFileExtension(file.type);

  return (
    <div className={styles.file}>
      <div className={styles.fileContainer}>
        <div>{fileTypeIcons[fileType]}</div>
        <p>{file.name}</p>
      </div>
      <p>{fileSize}</p>
    </div>
  );
}
