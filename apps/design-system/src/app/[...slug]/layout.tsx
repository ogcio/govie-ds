import { notFound } from "next/navigation";
import * as documents from "@/lib/documents/documents";
import { SideNavigationConnected } from "@/components/navigation/side-navigation-connected";

export async function generateStaticParams() {
  return documents.getAll().map((document) => ({
    slug: document.slug.split("/"),
  }));
}

type DocLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
};

export default function DocLayout({ children, params }: DocLayoutProps) {
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
