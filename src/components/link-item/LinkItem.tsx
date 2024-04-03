import cn from "clsx";
import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";

import type { LinkItemProps } from "@/types/links";
import styles from "./styles.module.scss";

export function LinkItem({ href, label, Icon, onClick }: LinkItemProps) {
  const {
    location: { pathname },
  } = useRouterState();

  const isActive = pathname.includes(href as string);

  const linkItemStyles = cn({
    [styles.linkItem]: true,
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
