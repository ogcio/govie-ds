const config = {
  plugins: [
    {
      postcssPlugin: 'flatten-tailwind-layers',
      Once(root) {
        root.walkAtRules('layer', (atRule) => {
          if (atRule.nodes && atRule.nodes.length > 0) {
            atRule.replaceWith(atRule.nodes);
            return;
          }

          atRule.remove();
        });
      },
    },
  ],
};

export default config;
