import cn from "clsx";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppContext } from "@/contexts/AppContext";
import supabase from "@/lib/supabase";
import useWindowSize from "@/hooks/useWindowSize";
import { Icons, LinkItem } from "@/components";
import { links } from "./links";
import { breakpoints } from "@/styles/variables";
import styles from "./styles.module.scss";

const SidePanel = () => {
  const { sidePanelOpen, setSidePanelOpen } = useAppContext();
  const { width } = useWindowSize();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  const sidePanelStyles = cn({
    [styles.sidepanel]: true,
    [styles.sidepanelOpen]: sidePanelOpen,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in");
  };

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (sidePanelOpen && width < breakpoints.m) {
      document.body.className += styles.hideOverflow;
    }
  }, [sidePanelOpen, width]);

  if (isAuthPage) return null;

  return (
    <aside className={sidePanelStyles}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to='/dashboard' onClick={() => setSidePanelOpen(false)}>
            <img
              src='/assets/images/logo_cropped_transparent.svg'
              alt='JobsTrackr logo'
            />
          </Link>
          <div
            aria-label='Close menu'
            className={styles.menuTrigger}
            onClick={() => setSidePanelOpen(false)}
          >
            <Icons.Close />
          </div>
        </div>
        <div
          className={styles.newApplication}
          onClick={() => setSidePanelOpen(false)}
        >
          <LinkItem
            label='New application'
            href='applications?action=new-application'
            Icon={<Icons.Plus />}
          />
        </div>
        <ul className={styles.list}>
          {links.map(({ label, href, Icon }) => (
            <LinkItem
              onClick={() => setSidePanelOpen(false)}
              key={label}
              href={href}
              label={label}
              Icon={<Icon />}
            />
          ))}
        </ul>
        <footer className={styles.footer}>
          <LinkItem
            href='settings'
            customLink
            onClick={() => setSidePanelOpen(false)}
          >
            <Icons.Settings />
            <p>Settings</p>
          </LinkItem>
          <LinkItem
            href='feedback'
            label='Feedback'
            Icon={<Icons.Feedback />}
            onClick={() => setSidePanelOpen(false)}
          />
          <div
            onClick={() => handleSignOut()}
            style={{ marginLeft: "-3px" }}
            aria-label='sign out'
          >
            <LinkItem label='Sign out' Icon={<Icons.Signout />} />
          </div>
        </footer>
      </div>
    </aside>
  );
};

export default SidePanel;
