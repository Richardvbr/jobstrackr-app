import { usePathname } from "next/navigation";
import { Link } from "react-router-dom";
import cn from "clsx";

import type { LinkItemProps } from "@/types/links";
import styles from "./styles.module.scss";

const LinkItem = ({
  href,
  label,
  Icon,
  onClick,
  customLink,
  children,
}: LinkItemProps) => {
  const pathName = usePathname();
  const isActive = pathName.includes(href as string);

  const linkItemStyles = cn({
    [styles.linkItem]: true,
    [styles.linkItemActive]: isActive,
  });

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <li className={linkItemStyles} onClick={handleClick}>
      {href ? (
        <Link to={`/${href}`}>
          {customLink ? (
            <>{children}</>
          ) : (
            <>
              <div className={styles.icon}>{Icon}</div>
              <p>{label}</p>
            </>
          )}
        </Link>
      ) : (
        <div>
          <div className={styles.icon}>{Icon}</div>
          <p>{label}</p>
        </div>
      )}
    </li>
  );
};

export default LinkItem;
