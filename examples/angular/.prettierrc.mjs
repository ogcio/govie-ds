import base from '../../.prettierrc.json' with { type: 'json' };

export default {
  ...base,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [{ files: '*.html', options: { parser: 'angular' } }],
};
