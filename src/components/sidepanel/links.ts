import { LinkItemProps } from "@/types/links";
import { Icons } from "@/components";

export const links: LinkItemProps[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    Icon: Icons.Dashboard,
  },
  {
    href: "/documents",
    label: "Documents",
    Icon: Icons.Document,
  },
  {
    href: "/questions",
    label: "Questions",
    Icon: Icons.Question,
  },
  // {
  //   href: "tips",
  //   label: "Tips and prepare",
  //   Icon: Icons.Bulb,
  // },
];
