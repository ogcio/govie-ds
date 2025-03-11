import { html as beautify } from 'js-beautify';
import { renderMacro } from '../macro';
import { LabelProps } from '../label/label.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { ErrorTextProps } from '../error-text/error-text.schema';

export function renderComponent<TProps = unknown>({
  name,
  html,
  path,
}: {
  name: string;
  html: string;
  path?: string;
}) {
  return function (props: TProps) {
    const renderedMacro = renderMacro({ name, html, path })(props);
    return <div dangerouslySetInnerHTML={{ __html: renderedMacro }} />;
  };
}

export const beautifyHtmlNode = (node: HTMLElement) => {
  const beautifyOptions = {
    indent_size: 2,
    end_with_newline: false,
    preserve_newlines: false,
    inline: ['inline'],
  };

  const formattedNode = beautify(node.outerHTML, beautifyOptions);

  return formattedNode;
};

export const createLabel = (labelProps: LabelProps) => {
  const label = document.createElement('label');
  label.className =
    `gi-text-${labelProps.size} gi-label ${labelProps.className}`.trim();
  label.textContent = labelProps.content;
  if (labelProps.for) {
    label.htmlFor = labelProps.for;
  }
  return label;
};

export const createHint = (hintProps: HintTextProps) => {
  const label = document.createElement('div');
  label.className =
    `gi-hint-text-${hintProps.size} gi-hint-text ${hintProps.className}`.trim();
  label.textContent = hintProps.content;

  return label;
};

export const createErrorText = (errorProps: ErrorTextProps) => {
  const errorText = document.createElement('div');
  errorText.className =
    `gi-error-text-${errorProps.size} gi-error-text ${errorProps.className}`.trim();
  errorText.textContent = errorProps.content;
  errorText.role = 'alert';

  return errorText;
};

export const createFormField = (formFieldProps: {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
}) => {
  const formField = document.createElement('fieldset');
  formField.className =
    `${formFieldProps.error ? 'gi-error-state' : ''}`.trim();

  if (formFieldProps.label) {
    const label = createLabel(formFieldProps.label);
    formField.append(label);
  }

  if (formFieldProps.hint) {
    const hint = createHint(formFieldProps.hint);
    formField.append(hint);
  }

  if (formFieldProps.error) {
    const error = createErrorText(formFieldProps.error);
    formField.append(error);
  }

  return formField;
};
