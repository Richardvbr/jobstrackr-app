import { format } from 'date-fns';
import { enGB, nl } from 'date-fns/locale';
import { capitalizeFirstLetter } from './text';

export const getDateFnsLocale = (locale: string) => {
  switch (locale) {
    case 'nl':
      return nl;
    case 'en':
      return enGB;
    default:
      break;
  }
};

export const formatDate = (d: Date) => format(d, 'MMM do, yyyy');

export const formatDateWithTime = (d: Date) => format(d, 'dd-MM-yyyy  HH:mm');

export const sortDate = (a: Date, b: Date) =>
  new Date(a).getTime() - new Date(b).getTime();

export const splitDateDayTime = (dateInput: Date | string, locale: string) => {
  const date = new Date(dateInput);

  const day = format(date, 'dd MMMM yyyy', {
    locale: getDateFnsLocale(locale),
  });
  const time = format(date, 'HH:mm:ss', { locale: getDateFnsLocale(locale) });

  return { day, time };
};

// Mo 03-07-2023 at 11:41:00
export const formatLongDateTime = (d: Date, locale: string, label: string) => {
  const lang = getDateFnsLocale(locale);

  const day = capitalizeFirstLetter(format(d, 'EEEEEE', { locale: lang }));
  const date = format(d, 'dd-MM-yyyy');
  const time = format(d, 'HH:mm');

  return `${day} ${date} ${label} ${time}`;
};
