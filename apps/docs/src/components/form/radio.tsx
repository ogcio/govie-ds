export const standardProps = {
  fieldId: 'uniqueId',
  title: {
    value: 'Where do you live?',
    asHeading: {
      size: 'md',
      as: 'h2',
    },
  },
  items: [
    {
      label: 'England',
      value: 'england',
    },
    {
      label: 'Scotland',
      value: 'scotland',
    },
    {
      label: 'Ireland',
      value: 'ireland',
    },
  ],
};

export const inlineProps = {
  ...standardProps,
  inline: true,
};

export const hintsProps = {
  fieldId: 'uniqueId',
  title: {
    value: 'Have you changed your name?',
    hint: 'This includes changing your last name or spelling your name differently.',
    asHeading: {
      size: 'md',
      as: 'h2',
    },
  },
  items: [
    {
      label: 'Yes',
      value: 'yes',
      hint: 'Yes, I have changed my name',
    },
    {
      label: 'No',
      value: 'no',
      hint: "No, I didn't change my name",
    },
  ],
};