import { Prose } from '@/components/typography/prose';
import { Responsive } from './responsive';

export function TypographyResponsive() {
  return (
    <Responsive title="Sample">
      <Prose>
        <h1>Hello world</h1>
      </Prose>
    </Responsive>
  );
}
