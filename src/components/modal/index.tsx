import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import { useClickOutside } from '@/hooks/useClickOutside';
import { Icons } from '@/components';
import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode;
  opened: boolean;
  handleClose: () => void;
  modalTitle: string;
  [key: string]: any;
};

export function Modal({ children, opened = false, handleClose, modalTitle, ...props }: ModalProps) {
  const modalRef = useRef(null);

  // Close when clicked outside modal
  useClickOutside(modalRef, () => opened && handleClose());

  // Disable scroll, close when ESC is pressed
  useEffect(() => {
    if (opened) {
      document.body.className += styles.hideOverflow;
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (opened && event.code === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.classList.remove(styles.hideOverflow);
    };
  }, [opened]);

  const animVariants: Variants = {
    open: { opacity: 1 },
    collapsed: { opacity: 0 },
  };

  return createPortal(
    <AnimatePresence>
      {opened && (
        <motion.div
          initial='collapsed'
          animate='open'
          exit='collapsed'
          variants={animVariants}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={styles.backdrop}
        >
          <motion.dialog
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={animVariants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            {...props}
            open={opened}
            className={styles.modal}
            ref={modalRef}
          >
            <header>
              <h1>{modalTitle}</h1>
              <div className={styles.close} onClick={handleClose}>
                <Icons.Close />
              </div>
            </header>
            {children}
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
