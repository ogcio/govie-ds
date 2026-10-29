import base from '../../.prettierrc.json' with { type: 'json' };

export default { ...base, overrides: [{ files: '*.html', options: { parser: 'angular' } }] };
