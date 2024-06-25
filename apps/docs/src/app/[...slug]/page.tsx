import { notFound } from 'next/navigation';
import { DocumentStatus } from '@/components/document/common/document-status';
import { Draft } from '@/components/document/common/draft';
import { Mdx } from '@/components/document/common/mdx';
import * as documents from '@/lib/documents/documents';

type DocumentPageProps = {
  params: {
    slug: string[];
  };
};

export default function DocumentPage({ params }: DocumentPageProps) {
  const document = documents.getBySlug({ slug: params.slug });

  if (!document) {
    notFound();
  }

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center">
        {document.status === 'stable' ? null : (
          <div>
            <DocumentStatus status={document.status} />
          </div>
        )}
        {document.draft ? <Draft /> : null}
      </div>
      {document.status !== 'coming-soon' || document.draft ? (
        <div>
          <Mdx code={document.body.code} />
        </div>
      ) : null}
    </section>
  );
}
