import { notFound } from "next/navigation";
import { Mdx } from "@/components/document/mdx";
import * as documents from "@/lib/documents/documents";
import { DocumentStatus } from "@/components/document/document-status";

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
      {document.status !== "stable" ? (
        <div>
          <DocumentStatus status={document.status} />
        </div>
      ) : null}
      {document.status !== "coming-soon" ? (
        <div>
          <Mdx code={document.body.code} />
        </div>
      ) : null}
    </section>
  );
}
