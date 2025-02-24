import { useState } from 'react';
import { AccordionItem } from './accordion-item';

interface AccordionProps {
  items: any[];
}

export function Accordion({ items }: AccordionProps) {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  function handleActiveItem(id: string) {
    if (activeItems?.includes(id)) {
      return setActiveItems((prevState) => prevState?.filter((item) => item !== id));
    }

    setActiveItems((prevState) => [...prevState, id as string]);
  }

  return items.map(({ title, content, id }) => (
    <AccordionItem
      key={id}
      id={id}
      title={title}
      open={activeItems?.includes(id)}
      onToggle={() => handleActiveItem(id as string)}
    >
      {content}
    </AccordionItem>
  ));
}
