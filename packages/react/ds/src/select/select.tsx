import { Label, LabelProps } from '../label/label.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { ErrorTextProps } from '../error-text/error-text.js';

type SelectProps = {
  id: string;
  label?: LabelProps;
  options: {
    label: string;
    value: string;
  }[];
  hint?: HintTextProps;
  error?: ErrorTextProps;
};

const Select = ({ id, label, options, hint, error }: SelectProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={id} size={label.size}>
          {label.content}
        </Label>
      )}
      {hint && <HintText size={hint.size}>{hint.content}</HintText>}
    </div>
  );
};

export default Select;
