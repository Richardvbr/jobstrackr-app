import cn from 'clsx';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { LinkItemProps } from '@/types/links';
import styles from './styles.module.scss';

export function LinkItem({ href, label, Icon, onClick }: LinkItemProps) {
  const { pathname } = useLocation();

  const isActive = pathname.includes(href as string);

  const linkItemStyles = cn(styles.linkItem, {
    [styles.linkItemActive]: isActive,
  });

  const handleClick = () => {
    onClick && onClick();
  };

  const itemContent = (
    <>
      <div className={styles.icon}>{Icon as ReactNode}</div>
      <p>{label}</p>
    </>
  );

  return (
    <li className={linkItemStyles} onClick={handleClick}>
      {href ? (
        <Link to={`${href}`}>{itemContent}</Link>
      ) : (
        <div className={styles.noHrefButton}>{itemContent}</div>
      )}
    </li>
  );
}
