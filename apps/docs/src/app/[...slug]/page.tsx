import { Heading, Tag } from '@govie-ds/react';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/document/common/mdx';
import * as documents from '@/lib/documents/documents';
import { slugify } from '@/lib/utilities';

type DocumentPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

type MarkdownHeading = {
  depth: number;
  slug: string;
  text: string;
};

const extractHeadingsFromMdx = (raw: string): MarkdownHeading[] => {
  const regXHeader = /#{1,6}\s.+/g;

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

export default async function DocumentPage({ params }: DocumentPageProps) {
  const resolvedParameters = await params;
  const document = documents.getBySlug({ slug: resolvedParameters.slug });

  if (!document) {
    notFound();
  }

  const tocItems = extractHeadingsFromMdx(document.body.raw);
  const hideToc = document.hideToc;

  return (
    <>
      <article id="main" className="w-full flex-auto gi-prose gi-max-w-none">
        {document.status !== 'stable' && (
          <div className="flex justify-between items-center py-2">
            {document.status === 'in-review' && (
              <Tag text="In Review" type="info" />
            )}
            {document.status === 'draft' && <Tag text="Draft" type="warning" />}
          </div>
        )}
        <Mdx code={document.body.code} />
      </article>
      {!hideToc && (
        <aside
          aria-label="table of content"
          className="w-full max-w-48 hidden md:block flex-auto"
        >
          {tocItems?.filter((item) => item.depth > 1).length > 0 && (
            <>
              <Heading as="h4">On this page</Heading>
              <ul className="gi-list p-0">
                {tocItems
                  .filter((item) => item.depth > 1)
                  .map((item) => (
                    <li
                      key={item.slug}
                      style={{ marginLeft: `${(item.depth - 2) * 20}px` }}
                    >
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
        </aside>
      )}
    </>
  );
}
