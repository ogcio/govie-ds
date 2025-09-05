import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import './styles.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(HTMLCanvasElement.prototype.getContext as any) = vi.fn();
