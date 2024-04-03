import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useMemo, useRef } from "react";
import cn from "clsx";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

import { useClickOutside } from "@/hooks/useClickOutside";
import style from "./styles.module.scss";

export type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  targetEl: any;
  offset?: number[];
  placement?: Placement;
} & React.ComponentPropsWithoutRef<"div">;

const Menu = ({
  isOpen = false,
  onClose,
  targetEl,
  offset,
  placement = "bottom-end",
  children,
  className,
}: MenuProps) => {
  const ref = useRef<any>();
  const classes = cn(style.menu, className);

  const offsetModifier = useMemo(
    () => ({
      name: "offset",
      options: {
        offset: () => {
          return offset ?? [0, 10];
        },
      },
    }),
    [offset]
  );

  const { styles, attributes } = usePopper(targetEl, ref.current, {
    placement,
    modifiers: [offsetModifier],
  });

  useClickOutside(ref, onClose, targetEl);

  const variants: Variants = {
    initial: {
      opacity: 0,
    },
    closed: {
      transition: { duration: 0.2 },
      opacity: 0,
    },
    open: {
      transition: { duration: 0.2 },
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className={classes}
        initial='initial'
        animate={isOpen ? "open" : "closed"}
        style={{ ...styles.popper, pointerEvents: isOpen ? "all" : "none" }}
        variants={variants}
        {...attributes.popper}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Menu;
