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
  const { title, description } = documents.getMeta({ slug: params.slug });

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
    <div className="gi-layout-container-full-width flex flex-row gap-4 lg:gap-6">
      <SideNavigationConnected />
      {children}
    </div>
  );
}
