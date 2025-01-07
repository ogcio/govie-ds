import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';
import {
  Select as SelectComposable,
  SelectGroupItem,
  SelectItem,
} from '../select-composable/select.js';

export type Option = {
  label: string;
  value: string;
};

export type GroupOption = {
  groupName: string;
  items: Option[];
};

type options = (Option | GroupOption)[];

export type SelectProps = {
  id: string;
  label?: LabelProps;
  options: options;
  hint?: HintTextProps;
  error?: ErrorTextProps;
};

export function Select({ id, label, options, hint, error }: SelectProps) {
  const ariaLabel = label?.text || id;
  return (
    <div>
      {label?.text && (
        <Label
          text={label.text}
          htmlFor={id}
          size={label.size}
          className={!hint?.text && !error?.text ? 'gi-mb-2' : 'gi-mb-1'}
        />
      )}
      {hint?.text && <HintText text={hint.text} size={hint.size} />}
      {error?.text && <ErrorText text={error.text} size={error.size} />}
      <SelectComposable id={id} aria-label={ariaLabel}>
        {options.map((option, index) => {
          const isGroupOption = 'groupName' in option;
          return isGroupOption ? (
            <SelectGroupItem
              label={option.groupName}
              key={`optgroup-${option.groupName}-${index}`}
            >
              {option.items.map((option, index) => (
                <SelectItem
                  key={`option-${option.value}-${index}`}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroupItem>
          ) : (
            <SelectItem
              key={`option-${option.value}-${index}`}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectComposable>
    </div>
  );
}
