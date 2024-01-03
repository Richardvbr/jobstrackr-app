import cn from "clsx";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppContext } from "@/contexts/AppContext";
import { supabase } from "@/lib/supabase";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Icons, LinkItem } from "@/components";
import { links } from "./links";
import { breakpoints } from "@/styles/variables";
import styles from "./styles.module.scss";

export function SidePanel() {
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
      <ul className={styles.navLinks}>
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
        <ul className={styles.navLinks}>
          <LinkItem
            href='settings'
            label='Settings'
            Icon={<Icons.Settings />}
            onClick={() => setSidePanelOpen(false)}
          />
          <LinkItem
            href='feedback'
            label='Feedback'
            Icon={<Icons.Feedback />}
            onClick={() => setSidePanelOpen(false)}
          />
          <LinkItem
            label='Sign out'
            onClick={handleSignOut}
            Icon={<Icons.Signout />}
          />
        </ul>
      </footer>
    </aside>
  );
}
