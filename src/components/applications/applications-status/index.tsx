import cn from 'clsx';

import { capitalizeFirstLetter } from '@/utils/text';
import { ApplicationStatusType } from '@/types/application';
import styles from './styles.module.scss';

type ApplicationStatusProps = {
  status: ApplicationStatusType;
};

export function ApplicationStatus({ status }: ApplicationStatusProps) {
  const lowercaseStatus = status?.toLowerCase();

  const classes = cn(styles.status, {
    [styles[lowercaseStatus]]: lowercaseStatus && lowercaseStatus !== 'status',
  });

  return (
    <div className={classes}>
      <p>{capitalizeFirstLetter(lowercaseStatus || 'None')}</p>
    </div>
  );
}
