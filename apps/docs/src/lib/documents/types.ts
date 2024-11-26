import { Doc } from 'contentlayer/generated';

export type MetaDocument =
  | Omit<Doc, 'body' | '_id' | '_raw' | 'type' | 'id' | 'slug'>
  | Omit<Doc, 'body' | '_id' | '_raw' | 'type' | 'id' | 'slug' | 'status'>;
