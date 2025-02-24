import { LinkItemProps } from '@/types/links';
import { Icons } from '@/components/shared';

export const links: LinkItemProps[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    Icon: Icons.Dashboard,
  },
  {
    href: '/documents',
    label: 'Documents',
    Icon: Icons.Document,
  },
  {
    href: '/questions',
    label: 'Questions/notes',
    Icon: Icons.Question,
  },
  {
    href: '/compare',
    label: 'Compare',
    Icon: Icons.Compare,
  },
  // {
  //   href: "tips",
  //   label: "Tips and prepare",
  //   Icon: Icons.Bulb,
  // },
];
