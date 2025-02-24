import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Accordion } from '@/components/shared/accordion';

export function QuestionsRoute() {
  useDocumentTitle('Questions | JobsTrackr');

  const items: any[] = [
    { title: 'Item 1', content: 'answer', id: '1' },
    { title: 'Item 2', content: 'answer', id: '2' },
    { title: 'Item 3', content: 'answer', id: '3' },
    { title: 'Item 4', content: 'answer', id: '4' },
  ];

  return (
    <>
      <h1>Questions</h1>
      <Accordion items={items} />
    </>
  );
}
