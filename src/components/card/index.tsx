import cn from "clsx";
import styles from "./card.module.scss";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
  shadow?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
};

const Card = ({
  children,
  shadow,
  className,
  title,
  subtitle,
  ...props
}: CardProps) => {
  const classes = cn([styles.card], className, {
    [styles.shadow]: shadow,
  });

  return (
    <div {...props} className={classes}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      {children}
    </div>
  );
};

export default Card;
