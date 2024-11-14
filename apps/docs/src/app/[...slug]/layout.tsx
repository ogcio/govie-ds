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
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="w-full hidden md:block p-4">
        <SideNavigationConnected />
      </div>
      <div className="w-full md:col-span-4">{children}</div>
    </div>
  );
}
