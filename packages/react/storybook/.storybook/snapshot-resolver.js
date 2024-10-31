export default {
  resolveSnapshotPath: (testPath) => {
    return (
      testPath.replace('packages/react/ds/src', 'assets/snapshots/react') +
      '.snap-react'
    );
  },
  resolveTestPath: (snapshotFilePath) => {
    if (snapshotFilePath.includes('html')) {
      return '';
    }
    return snapshotFilePath
      .replace('assets/snapshots/react', 'packages/react/ds/src')
      .replace('.snap-react', '');
  },

  testPathForConsistencyCheck: 'example.ts',
};
