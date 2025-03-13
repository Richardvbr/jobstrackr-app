import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

export type AccordionItem = {
  id?: string;
  title: string;
  description?: string;
  open?: boolean;
  category?: string;
  children?: ReactNode;
  onToggle?: () => void;
};

// TODO: finish component
export function AccordionItem({
  // id,
  title,
  description,
  open = true,
  // category = "",
  children,
  onToggle,
}: AccordionItem) {
  const headerVariants: Variants = {
    closed: {
      transition: { duration: 0.3 },
      opacity: 0,
    },
    open: {
      transition: { duration: 0.3 },
      opacity: 1,
    },
  };

  const contentVariants: Variants = {
    closed: {
      transition: { duration: 0.3 },
      height: 0,
      opacity: 0,
    },
    open: {
      transition: { duration: 0.3 },
      height: 'auto',
      opacity: 1,
    },
  };

  function handleToggle() {
    onToggle && onToggle();
  }

  return (
    <div className={styles.accordionItem} onClick={handleToggle}>
      <motion.header
        key='header'
        variants={headerVariants}
        className={cn(styles.header, open && styles.headerActive)}
        onClick={handleToggle}
      >
        <p>{title}</p>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.section
            key='content'
            className={styles.content}
            initial='closed'
            exit='closed'
            animate={open ? 'open' : 'closed'}
            variants={contentVariants}
          >
            {description ? <p>{description}</p> : children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
