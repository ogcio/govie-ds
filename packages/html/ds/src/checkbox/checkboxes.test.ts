import { render } from '../common/render';
import html from './checkboxes-group.html?raw';
import { CheckboxesProps, CheckboxSizeEnum } from './checkboxes.schema';

describe('checkboxes', () => {
  const renderCheckboxes = render<CheckboxesProps>({
    componentName: 'checkboxes',
    macroName: 'govieCheckboxesGroup',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderCheckboxes({
      fieldId: 'UniqueID',
      items: [
        {
          label: 'Checkbox 1',
          value: 'Checkbox-1',
        },
        {
          label: 'Checkbox 2',  
          value: 'Checkbox-2',

        },
        {
          label: 'Checkbox 3',
          value: 'Checkbox-3',
        },
      ],
      title: {
        value: 'Organisation',
        asHeading: true,
        hint: 'Title hint',
      },
      errorMessage: 'Error message',
      noneOption: {
        label: 'Checkbox None',
        hint: 'Hint for checkbox none',
        value: 'checkbox-none',
      },
      checkboxesSize: CheckboxSizeEnum.Large,
    });

    const test = screen.getByTestId('govie-checkboxes');
    console.debug(test.innerHTML)
    await screen.axe();
  });
});
