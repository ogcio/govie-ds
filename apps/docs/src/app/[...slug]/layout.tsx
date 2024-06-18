import { notFound } from 'next/navigation';
import { SideNavigationConnected } from '@/components/navigation/side-navigation-connected';
import * as documents from '@/lib/documents/documents';

export async function generateStaticParams() {
  return documents.getAll().map((document) => ({
    slug: document.slug.split('/'),
  }));
}

type DocumentLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
};

export default function DocumentLayoutProps({
  children,
  params,
}: DocumentLayoutProps) {
  const document = documents.getBySlug({ slug: params.slug });

  if (!document) {
    notFound();
  }

  return (
    <article className="flex gap-5xl">
      <SideNavigationConnected />
      {children}
    </article>
  );
}
