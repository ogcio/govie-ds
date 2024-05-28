import { getDocumentDetails } from "./src/lib/documents/document-details";
import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    draft: { type: "boolean", required: true },
    status: {
      type: "enum",
      options: ["coming-soon", "in-development", "stable"],
      required: false,
      default: "coming-soon",
    },
  },
  computedFields: {
    id: {
      type: "string",
      resolve: (doc) => {
        const docDetails = getDocumentDetails(doc._raw.flattenedPath);
        return docDetails.id;
      },
    },
    slug: {
      type: "string",
      resolve: (doc) => {
        const docDetails = getDocumentDetails(doc._raw.flattenedPath);
        return docDetails.slug;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Doc],
});
