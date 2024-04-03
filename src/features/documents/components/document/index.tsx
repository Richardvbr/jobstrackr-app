import { FileIcon, defaultStyles } from "react-file-icon";
import { Document } from "@/types/document";
import styles from "./styles.module.scss";
import { capitalizeFirstLetter } from "@/utils/text";
import { BsThreeDotsVertical } from "@/components/icons";

interface DocumentProps {
  document: Document;
}

export function DocumentItem({ document }: DocumentProps) {
  const { title, file_type: fileType, file_path: filePath } = document;

  const fileUrl = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/documents/${filePath}?download=${title}.${fileType}`;

  return (
    <div className={styles.document}>
      <div className={styles.heading}>
        <p>{capitalizeFirstLetter(title as string)}</p>
        <a href={fileUrl} download>
          <BsThreeDotsVertical size={18} />
        </a>
      </div>
      <div className={styles.fileType}>
        <FileIcon extension={fileType} {...defaultStyles[fileType]} />
      </div>
    </div>
  );
}
