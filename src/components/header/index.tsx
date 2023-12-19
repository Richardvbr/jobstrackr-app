import { useAppContext } from "@/contexts/AppContext";
import { Link, useLocation } from "react-router-dom";

import { Icons } from "@/components";
import styles from "./styles.module.scss";

const Header = () => {
  const { setSidePanelOpen } = useAppContext();
  const { pathname } = useLocation();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  if (isAuthPage) return null;

  return (
    <header aria-label='Open menu' className={styles.header}>
      <Icons.Hamburger onClick={() => setSidePanelOpen(true)} />
      <Link to='/dashboard'>
        <img
          src='/assets/images/logo_cropped_transparent.svg'
          alt='JobsTrackr logo'
        />
      </Link>
    </header>
  );
};

export default Header;
