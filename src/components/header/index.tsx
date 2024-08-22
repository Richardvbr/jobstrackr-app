import { Link, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { Icons } from '@/components';
import styles from './styles.module.scss';
import { useAppStore } from '@/stores/appStore';

export function Header() {
  const { openSidePanel } = useAppStore(
    useShallow((state) => ({
      openSidePanel: state.openSidePanel,
    }))
  );
  const { pathname } = useLocation();

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  if (isAuthPage) return null;

  return (
    <header aria-label='Open menu' className={styles.header}>
      <Icons.Hamburger onClick={() => openSidePanel()} />
      <Link to='/dashboard'>
        <img src='/assets/images/logo_cropped_transparent.svg' alt='JobsTrackr logo' />
      </Link>
    </header>
  );
}
