import { Heading, Paragraph } from '@govie-react/ds';
import { config } from '@/lib/config';

export default function ContactPage() {
  return (
    <div>
      <Heading>Contact</Heading>
      <Paragraph>
        You can contact the design system team using{' '}
        <a
          target="_blank"
          className="underline text-blue-700 hover:decoration-md"
          href={config.signUpFormUrl}
        >
          this form.
        </a>
      </Paragraph>
    </div>
  );
}
