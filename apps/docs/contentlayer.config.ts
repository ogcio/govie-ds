import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { getDocumentDetails } from './src/lib/documents/document-details';

const Document = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    navigation: { type: 'string', required: false },
    description: { type: 'string', required: true },
    draft: { type: 'boolean', required: true },
    status: {
      type: 'enum',
      options: ['coming-soon', 'in-development', 'stable'],
      required: false,
      default: 'coming-soon',
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
});
