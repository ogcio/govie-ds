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

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const document = documents.getBySlug({ slug: params.slug });
  const suffix = 'Gov IE Design System';

  if (!document) {
    return {
      title: `Page not found - ${suffix}`,
      description: 'The requested URL was not found ',
    };
  }

  const title = `${document.title} - ${suffix}`;
  const { description } = document;

  return {
    title,
    description,
  };
}

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
