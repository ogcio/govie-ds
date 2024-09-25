import { Label, LabelProps } from '../label/label.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';

type Option = {
  label: string;
  value: string;
};

type GroupOption = {
  groupName: string;
  items: Option[];
};

type options = (Option | GroupOption)[];

type SelectProps = {
  id: string;
  label?: LabelProps;
  options: options;
  hint?: HintTextProps;
  error?: ErrorTextProps;
};

export function Select({ id, label, options, hint, error }: SelectProps) {
  const ariaLabel = label?.content || id;
  return (
    <div>
      {label && (
        <Label htmlFor={id} size={label.size}>
          {label.content}
        </Label>
      )}
      {hint && <HintText size={hint.size}>{hint.content}</HintText>}
      {error && <ErrorText size={error.size}>{error.content}</ErrorText>}
      <select
        className="focus:gi-outline focus:gi-outline-[3px] focus:gi-outline-yellow-400 focus:gi-outline-offset-0 gi-p-1.5 gi-border-black gi-border-[3px] gi-border-solid gi-min-w-56 gi-font-primary xs:gi-text-sm md:gi-text-md lg:gi-text-lg"
        id={ariaLabel}
        aria-label={ariaLabel}
      >
        {options.map((option) => {
          const isGroupOption = 'groupName' in option;
          return isGroupOption ? (
            <optgroup label={option.groupName}>
              {option.items.map((option) => (
                <option
                  className="gi-font-primary xs:gi-text-sm md:gi-text-md lg:gi-text-lg"
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option
              className="gi-font-primary xs:gi-text-sm md:gi-text-md lg:gi-text-lg"
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
