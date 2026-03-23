import { Props, Size } from './types';
export const getSize = (size: Props['size'], defaultSize: Props['size']): Props['size'] => size && Object.values(Size).includes(size) ? size : defaultSize