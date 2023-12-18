"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppContext } from "@/contexts/AppContext";
import { Icons } from "@/components";
import styles from "./styles.module.scss";

const Header = () => {
  const { setSidePanelOpen } = useAppContext();
  const path = usePathname();

  const isAuthPage = path === "/sign-in" || path === "/sign-up";

  if (isAuthPage) return null;

  return (
    <header aria-label='Open menu' className={styles.header}>
      <Icons.Hamburger onClick={() => setSidePanelOpen(true)} />
      <Link href='/dashboard'>
        <img
          src='/assets/images/logo_cropped_transparent.svg'
          alt='JobsTrackr logo'
        />
      </Link>
    </header>
  );
};

export default Header;
