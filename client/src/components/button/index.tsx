import cn from "clsx";

import type { ButtonType, ElementSizes } from "@/types/elements";
import styles from "./styles.module.scss";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  variant?: ButtonType;
  btnSize?: ElementSizes;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  iconOnly?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  btnSize = "s",
  fullWidth,
  disabled,
  onClick,
  iconOnly,
  ...props
}: ButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        styles.button,
        styles[variant],
        styles[btnSize],
        disabled && styles.disabled,
        iconOnly && styles.iconOnly,
        fullWidth && styles.fullWidth
      )}
      {...props}
    >
      <span className={styles.inner}>{children}</span>
    </button>
  );
};

export default Button;
