import ContactPage from '@/components/document/pages/contact';
import { getTitle } from '@/lib/documents';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getTitle('Contact us'),
  description: 'Contact us',
};

export default function Page() {
  return <ContactPage />;
}
