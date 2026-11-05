import { defineConfig } from 'vite';

export default defineConfig({
  // Library mode leaves `process.env.NODE_ENV` as is, and React reads it at runtime.
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  // The React library would otherwise resolve its own copy of React, and two copies break hooks.
  resolve: { dedupe: ['react', 'react-dom'] },
  build: {
    target: 'es2024',
    lib: {
      entry: 'src/index.tsx',
      name: 'DesignSystemInspector',
      formats: ['iife'],
      fileName: () => 'inspector.js',
    },
  },
});
