import { Size } from './types';

export const getSize = (size: Size | undefined, defaultSize: Size): Size =>
  size && Object.values(Size).includes(size) ? size : defaultSize;
