import { LinkItemProps } from "@/types/links";
import { Dashboard, List, Question, Document, Bulb } from "@/components/icons";

export const links: LinkItemProps[] = [
  {
    href: "dashboard",
    label: "Dashboard",
    Icon: Dashboard,
  },
  {
    href: "applications",
    label: "Applications",
    Icon: List,
  },
  {
    href: "questions",
    label: "Questions",
    Icon: Question,
  },
  {
    href: "documents",
    label: "Documents",
    Icon: Document,
  },
  {
    href: "prepare",
    label: "Tips and prepare",
    Icon: Bulb,
  },
];
