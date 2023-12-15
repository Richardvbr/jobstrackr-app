import { useAppContext } from "@/contexts/AppContext";
import { Hamburger } from "@/components/icons";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

const Header = () => {
  const { setSidePanelOpen } = useAppContext();
  const location = useLocation();

  console.log(location);

  // const isAuthPage = path === "/sign-in" || path === "/sign-up";

  // if (isAuthPage) return null;

  return (
    <header aria-label='Open menu' className={styles.header}>
      <Hamburger onClick={() => setSidePanelOpen(true)} />
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
