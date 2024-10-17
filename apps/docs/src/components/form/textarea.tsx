export const standardProps = {
  id: 'textarea-0',
  label: { text: 'Textarea Label' },
  hint: { text: 'Hint: This is a helpful hint' },
};

export const maximumCharactersProps = {
  ...standardProps,
  id: 'textarea-1',
  maxChars: 100,
};
