import { Heading, Paragraph } from '@govie-react/ds';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact us - Gov IE Design System',
  description: 'Contact us',
};

export default function ContactPage() {
  return (
    <div>
      <Heading>Contact</Heading>
      <Paragraph>
        You can contact the design system team using{' '}
        {/* TODO: replace the a tag with <Link> when target prop is implemented */}
        <a
          target="_blank"
          className="underline text-blue-700 hover:decoration-md"
          href={config.signUpFormUrl}
        >
          this form
        </a>
        .
      </Paragraph>
    </div>
  );
}
