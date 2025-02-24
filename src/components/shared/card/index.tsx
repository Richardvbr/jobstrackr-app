import cn from 'clsx';
import styles from './card.module.scss';

type CardProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
  shadow?: boolean;
  className?: string;
  title?: string;
};

export function Card({ children, shadow, className, title, ...props }: CardProps) {
  const classes = cn([styles.card], className, {
    [styles.shadow]: shadow,
  });

  return (
    <div {...props} className={classes}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.children}>{children}</div>
    </div>
  );
}
