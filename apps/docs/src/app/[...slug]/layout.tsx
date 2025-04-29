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
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}) {
  const resolvedParameters = await params;
  const { title, description } = documents.getMeta({
    slug: resolvedParameters.slug,
  });

  return {
    title,
    description,
  };
}

export default async function DocumentLayoutProps({
  children,
  params,
}: DocumentLayoutProps) {
  const resolvedParameters = await params;
  const document = documents.getBySlug({ slug: resolvedParameters.slug });

  if (!document) {
    notFound();
  }

  return (
    <main className="gi-layout-container-full-width flex flex-1 flex-row gap-4 lg:gap-6 pt-6 pb-1 lg:pt-8 lg:pb-2 content-stretch">
      <SideNavigationConnected />
      {children}
    </main>
  );
}
