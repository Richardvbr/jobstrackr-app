import { useRef, useState } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';
import mime from 'mime-types';

import type { Document } from '@/features/documents';
import { useWindowSize } from '@/hooks/useWindowSize';
import { capitalizeFirstLetter, truncate } from '@/utils/text';
import { BsThreeDotsVertical } from '@/components/icons';
import Menu from '@/components/menu';
import styles from './styles.module.scss';

interface DocumentProps {
  document: Document;
}

export function DocumentItem({ document }: DocumentProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const { title, file_type: fileType, file_path: filePath } = document;
  const fileExtension = mime.extension(fileType as string);
  const fileTitle = truncate(capitalizeFirstLetter(title as string), width < 768 ? 13 : undefined);

  const fileUrl = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/documents/${filePath}?download=${title}.${fileExtension}`;

  return (
    <div className={styles.document}>
      <div className={styles.heading}>
        <p>{fileTitle}</p>
        <div className={styles.menuButton} ref={menuRef} onClick={() => setMenuOpen((s) => !s)}>
          <BsThreeDotsVertical size={18} />
        </div>
      </div>
      <div className={styles.fileType}>
        <FileIcon
          extension={(fileExtension as string) ?? undefined}
          {...defaultStyles[fileExtension as DefaultExtensionType]}
        />
      </div>
      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        targetEl={menuRef.current}
        className={styles.downloadMenu}
      >
        <a href={fileUrl} download onClick={() => setMenuOpen(false)}>
          Download file
        </a>
      </Menu>
    </div>
  );
}
