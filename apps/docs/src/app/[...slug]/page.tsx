import { notFound } from 'next/navigation';
import { DocumentStatus } from '@/components/document/common/document-status';
import { Draft } from '@/components/document/common/draft';
import { Mdx } from '@/components/document/common/mdx';
import * as documents from '@/lib/documents/documents';
import { slugify } from '@/lib/slugify';
import { Heading } from '@govie-ds/react';

type DocumentPageProps = {
  params: {
    slug: string[];
  };
};

type MarkdownHeading = {
  depth: number;
  slug: string;
  text: string;
};

const extractHeadingsFromMdx = (raw: string): MarkdownHeading[] => {
  const regXHeader = /#{1,6}.+/g;

  return (
    raw.match(regXHeader)?.map((item) => {
      const depth = (item.match(/#/g) || []).length;
      return {
        depth,
        slug: slugify(item.slice(depth)) || '',
        text: item.slice(depth + 1),
      };
    }) || []
  );
};

export default function DocumentPage({ params }: DocumentPageProps) {
  const document = documents.getBySlug({ slug: params.slug });

  if (!document) {
    notFound();
  }

  const tocItems = extractHeadingsFromMdx(document.body.raw);
  console.log(tocItems);

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center">
        {document.status === 'stable' ? null : (
          <DocumentStatus status={document.status} />
        )}
        {document.draft ? <Draft /> : null}
      </div>
      {document.status !== 'coming-soon' || document.draft ? (
        <div className="gi-layout-column-container">
          <div className="gi-layout-column-2-3 px-4 prose">
            <Mdx code={document.body.code} />
          </div>
          <div className="gi-layout-column-1-3 hidden md:block not-prose p-4">
            {tocItems?.length > 0 && (
              <>
                <Heading as="h4">On this page</Heading>
                <ul className="gi-list p-0">
                  {tocItems
                    .filter((item) => item.depth > 1)
                    .map((item) => (
                      <li style={{ marginLeft: `${(item.depth - 2) * 20}px` }}>
                        <a
                          className="gi-link gi-link-sm gi-link-no-underline gi-link-no-visited"
                          href={`#${item.slug}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
