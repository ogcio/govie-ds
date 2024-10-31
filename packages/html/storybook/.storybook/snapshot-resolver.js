export default {
  resolveSnapshotPath: (testPath) => {
    return (
      testPath.replace('packages/html/ds/src', 'assets/snapshots/html') +
      '.snap-html'
    );
  },
  resolveTestPath: (snapshotFilePath) => {
    return snapshotFilePath
      .replace('assets/snapshots/html', 'packages/html/ds/src')
      .replace('.snap-html', '');
  },

  testPathForConsistencyCheck: 'example.ts',
};
