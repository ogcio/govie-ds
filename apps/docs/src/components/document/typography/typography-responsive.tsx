import { Responsive } from './responsive';
import { Prose } from '@/components/typography/prose';

export function TypographyResponsive() {
  return (
    <Responsive title="Sample" height={240}>
      <Prose>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <p>Paragraph</p>
      </Prose>
    </Responsive>
  );
}
