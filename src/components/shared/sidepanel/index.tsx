import cn from 'clsx';
import { useEffect } from 'react';
import { Link, useLocation, redirect } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { supabase } from '@/lib/supabase';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppStore } from '@/stores/appStore';

import { Icons, LinkItem } from '@/components/shared';
import { links } from './links';
import { breakpoints } from '@/styles/variables';
import styles from './styles.module.scss';

export function SidePanel() {
  const { sidePanelOpened, closeSidePanel } = useAppStore(
    useShallow((state) => ({
      sidePanelOpened: state.sidePanelOpened,
      closeSidePanel: state.closeSidePanel,
    }))
  );
  const { width } = useWindowSize();
  const { pathname } = useLocation();

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  const sidePanelStyles = cn({
    [styles.sidepanel]: true,
    [styles.sidepanelOpen]: sidePanelOpened,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    redirect('/sign-in');
  };

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (sidePanelOpened && width < breakpoints.m) {
      document.body.className += styles.hideOverflow;
    }
  }, [sidePanelOpened, width]);

  if (isAuthPage) return null;

  return (
    <aside className={sidePanelStyles}>
      <div className={styles.logoContainer}>
        <Link to='/dashboard' onClick={() => closeSidePanel()}>
          <img src='/assets/images/logo_cropped_transparent.svg' alt='JobsTrackr logo' />
        </Link>
        <div
          aria-label='Close menu'
          className={styles.menuTrigger}
          onClick={() => closeSidePanel()}
        >
          <Icons.Close />
        </div>
      </div>
      <ul className={styles.newApplication}>
        <LinkItem
          label='New application'
          href='/dashboard?action=new-application'
          Icon={<Icons.Plus />}
          onClick={() => closeSidePanel()}
        />
      </ul>
      <ul className={styles.navLinks}>
        {links.map(({ label, href, Icon }) => (
          <LinkItem
            onClick={() => closeSidePanel()}
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
            href='/settings'
            label='Settings'
            Icon={<Icons.Settings />}
            onClick={() => closeSidePanel()}
          />
          <LinkItem
            href='/feedback'
            label='Feedback'
            Icon={<Icons.Feedback />}
            onClick={() => closeSidePanel()}
          />
          <LinkItem label='Sign out' onClick={handleSignOut} Icon={<Icons.Signout />} />
        </ul>
      </footer>
    </aside>
  );
}
