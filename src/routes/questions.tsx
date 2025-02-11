import { Accordion } from '@/components/shared/accordion';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import type { AccordionItem as AccordionItemType } from '@/components/shared/accordion/accordion-item';

export function QuestionsRoute() {
  useDocumentTitle('Questions | JobsTrackr');

  const items: AccordionItemType[] = [
    { title: 'Item 1', description: 'answer', id: '1' },
    { title: 'Item 2', description: 'answer', id: '2' },
    { title: 'Item 3', description: 'answer', id: '3' },
    { title: 'Item 4', description: 'answer', id: '4' },
  ];

  return (
    <>
      <h1>Questions</h1>
      <Accordion items={items} />
    </>
  );
}
