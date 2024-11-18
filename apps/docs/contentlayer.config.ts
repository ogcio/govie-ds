import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import { mdxToMarkdown } from 'mdast-util-mdx';
import { toMarkdown } from 'mdast-util-to-markdown';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import type * as unified from 'unified';
import { getDocumentDetails } from './src/lib/documents/document-details';

type PostHeading = { level: 1 | 2 | 3; title: string };

const componentLibrary = defineNestedType(() => ({
  fields: {
    link: { type: 'string' },
    platform: {
      type: 'enum',
      options: ['figma', 'local', 'global', 'react'],
      required: true,
    },
    status: {
      type: 'enum',
      options: [
        'alpha',
        'beta',
        'stable',
        'considering',
        'not-available',
        'deprecated',
      ],
      required: false,
      default: 'not-available',
    },
  },
}));

const Document = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    navigation: { type: 'string', required: false },
    description: { type: 'string', required: true },
    status: {
      type: 'enum',
      options: ['draft', 'in-review', 'stable'],
      required: true,
      default: 'draft',
    },
    libraries: {
      type: 'list',
      of: componentLibrary,
      required: false,
    },
  },
  computedFields: {
    id: {
      type: 'string',
      resolve: (document) => {
        const documentDetails = getDocumentDetails(document._raw.flattenedPath);
        return documentDetails.id;
      },
    },
    slug: {
      type: 'string',
      resolve: (document) => {
        const documentDetails = getDocumentDetails(document._raw.flattenedPath);
        return documentDetails.slug;
      },
    },
    headings: {
      type: 'json',
      resolve: async (document) => {
        const headings: PostHeading[] = [];

        await bundleMDX({
          source: document.body.raw,
          mdxOptions: (options: any) => {
            options.remarkPlugins = [
              ...(options.remarkPlugins ?? []),
              tocPlugin(headings),
            ];
            return options;
          },
        });

        return [{ level: 1, title: document.title }, ...headings];
      },
    },
  },
}));

const tocPlugin =
  (headings: PostHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      node.children
        .filter((_: any) => _.type === 'heading')
        // eslint-disable-next-line unicorn/no-array-for-each
        .forEach((heading: any) => {
          const title = toMarkdown(
            { type: 'paragraph', children: heading.children },
            { extensions: [mdxToMarkdown()] },
          )
            .trim()
            // removes MDX in headlines
            .replaceAll(/<.*$/g, '')
            // remove backslashes (e.g. from list items)
            .replaceAll('\\', '')
            .trim();

          return headings.push({ level: heading.depth, title });
        });
    };
  };

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Document],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
  },
});
