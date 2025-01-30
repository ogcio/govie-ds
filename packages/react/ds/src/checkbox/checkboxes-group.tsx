'use client';
import { useState } from 'react';
import { ErrorText } from '../error-text/error-text.js';
import { Heading } from '../heading/heading.js';
import type { headingVariants } from '../heading/heading.js';
import { HintText } from '../hint-text/hint-text.js';
import { Checkbox, CheckboxSizeEnum } from './checkbox.js';
import { getSizeClass } from './helpers.js';

export type CheckboxesGroupType = {
  size?: CheckboxSizeEnum;
  groupId: string;
  errorMessage?: string;
  items: {
    value: string;
    label?: string;
    hint?: string;
    disabled?: boolean;
  }[];
  title?: {
    value: string;
    asHeading?: {
      size: keyof typeof headingVariants.variants.size;
      as: keyof typeof headingVariants.variants.as;
    };
    hint?: string;
  };
  noneOption?: {
    hint?: string;
    label: string;
    value: string;
  };
  onChange?: (items: string[]) => void;
};

export const CheckboxesGroup = ({
  groupId,
  errorMessage,
  title,
  items,
  size,
  noneOption,
  onChange = () => null,
}: CheckboxesGroupType) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, isNoneOption = false) => {
    let newValues = [];
    if (isNoneOption) {
      newValues = selectedValues.includes(value) ? [] : [value];
    } else {
      newValues = selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [
            ...selectedValues.filter(
              (selectedValue) => selectedValue !== noneOption?.value,
            ),
            value,
          ];
    }
    setSelectedValues(newValues);
    onChange(newValues);
  };

  return (
    <div
      className="gi-checkbox-group-container"
      data-testid="govie-checkboxes"
      role="group"
    >
      {errorMessage && (
        <div className="gi-checkbox-group-error" id={`${groupId}-error`} />
      )}
      <fieldset>
        {title && (
          <legend className="gi-checkbox-group-title" id={`${groupId}-title`}>
            {title.asHeading ? (
              <Heading size={title.asHeading.size} as={title.asHeading.as}>
                {title.value}
              </Heading>
            ) : (
              title.value
            )}
            {title.hint && (
              <div className="gi-mb-2">
                <HintText
                  data-testid="title-hint"
                  text={title.hint}
                  id={`${groupId}-title-hint`}
                />
              </div>
            )}
          </legend>
        )}
        <div className="gi-checkbox-group-checkboxes-container">
          {errorMessage && <ErrorText text={errorMessage} />}
          {items.map((checkbox, index) => (
            <Checkbox
              key={`checkbox-${index}-${checkbox.value}`}
              size={size}
              id={`${groupId}-${index}`}
              hint={checkbox.hint}
              value={checkbox.value}
              label={checkbox.label}
              disabled={checkbox.disabled}
              checked={selectedValues.includes(checkbox.value)}
              onChange={() => handleCheckboxChange(checkbox.value)}
              aria-describedby={
                checkbox.hint ? `${groupId}-${index}-hint` : undefined
              }
            />
          ))}

          {noneOption && (
            <>
              <p
                className={`${getSizeClass(size || CheckboxSizeEnum.Medium)} gi-text-center xs:gi-text-sm md:gi-text-md lg:gi-text-lg`}
              >
                or
              </p>
              <Checkbox
                size={size}
                id={`${groupId}-${items.length}`}
                hint={noneOption.hint}
                value={noneOption.value}
                label={noneOption.label}
                checked={selectedValues.includes(noneOption.value)}
                onChange={() => handleCheckboxChange(noneOption.value, true)}
                aria-describedby={
                  noneOption.hint
                    ? `${groupId}-${items.length}-hint`
                    : undefined
                }
              />
            </>
          )}
        </div>
      </fieldset>
    </div>
  );
};
