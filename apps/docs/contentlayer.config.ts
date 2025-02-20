import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';
import rehypeSlug from 'rehype-slug';
import { getDocumentDetails } from './src/lib/documents/document-details';

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
    hideToc: { type: 'boolean', required: false, default: false },
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
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Document],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
  },
});
