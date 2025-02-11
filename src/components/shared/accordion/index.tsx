import { useState } from "react";
import { AccordionItem, type AccordionItem as AccordionItemType } from "./accordion-item";

interface AccordionProps {
  items: AccordionItemType[];
}

export function Accordion({ items }: AccordionProps) {
  const [activeItem, setActiveItem] = useState<string>("");

  function handleActiveItem(id: string) {
    setActiveItem(activeItem === id ? "" : id);
  }

  return items.map(({ title, description, id }) => (
    <AccordionItem
      key={id}
      id={id}
      title={title}
      description={description}
      open={activeItem === id}
      onToggle={() => handleActiveItem(id as string)}
    />
  ));
}
