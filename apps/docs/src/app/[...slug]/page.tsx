import { notFound } from 'next/navigation';
import { Mdx } from '@/components/document/common/mdx';
import * as documents from '@/lib/documents/documents';
import { DocumentStatus } from '@/components/document/common/document-status';
import { Draft } from '@/components/document/common/draft';

type DocPageProps = {
  params: {
    slug: string[];
  };
};

export default function DocPage({ params }: DocPageProps) {
  const document = documents.getBySlug({ slug: params.slug });

  if (!document) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-2xl grow">
      <div className="flex justify-between items-center">
        {document.status !== 'stable' ? (
          <div>
            <DocumentStatus status={document.status} />
          </div>
        ) : null}
        {document.draft ? <Draft /> : null}
      </div>
      {document.status !== 'coming-soon' || document.draft ? (
        <div className="flex flex-col gap-xl">
          <Mdx code={document.body.code} />
        </div>
      ) : null}
    </section>
  );
}
