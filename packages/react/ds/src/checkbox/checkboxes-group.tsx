'use client';
import { useState } from 'react';
import { ErrorText } from '../error-text/error-text.js';
import { Heading } from '../heading/heading.js';
import type { headingVariants } from '../heading/heading.js';
import { HintText } from '../hint-text/hint-text.js';
import Checkbox, { CheckboxSizeEnum } from './checkbox.js';
import { getSizeClass } from './helpers.js';

export type CheckboxesGroupType = {
  size?: CheckboxSizeEnum;
  fieldId: string;
  errorMessage?: string;
  items: {
    value: string;
    label?: string;
    hint?: string;
  }[];
  title?: {
    value: string;
    asHeading?: {
      size: keyof typeof headingVariants.variants.size;
      tag: keyof typeof headingVariants.variants.as;
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
  fieldId,
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
    <div className="gi-checkbox-group-container" data-testid="govie-checkboxes">
      {errorMessage && <div className="gi-checkbox-group-error" />}
      <fieldset>
        {title && (
          <legend className="gi-checkbox-group-title">
            {title.asHeading ? (
              <Heading
                size={title.asHeading.size}
                as={title.asHeading.tag}
                className="!gi-mb-[var(--gieds-space-2)]"
              >
                {title.value}
              </Heading>
            ) : (
              title.value
            )}
            {title.hint && (
              <HintText
                data-testid="title-hint"
                text={title.hint}
                className="!gi-mb-[var(--gieds-space-2)]"
              />
            )}
          </legend>
        )}
        <div className="gi-checkbox-group-checkboxes-container">
          {errorMessage && (
            <ErrorText text={errorMessage} className="gi-mb-0" />
          )}
          {items.map((checkbox, index) => (
            <Checkbox
              key={`checkbox-${index}-${checkbox.value}`}
              dataElement={`checkbox${index}`}
              size={size}
              checkboxId={`${fieldId}-${index}`}
              hint={checkbox.hint}
              value={checkbox.value}
              label={checkbox.label}
              checked={selectedValues.includes(checkbox.value)}
              onChange={() => handleCheckboxChange(checkbox.value)}
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
                dataElement="checkbox-none-option"
                size={size}
                checkboxId={`${fieldId}-${items.length}`}
                hint={noneOption.hint}
                value={noneOption.value}
                label={noneOption.label}
                checked={selectedValues.includes(noneOption.value)}
                onChange={() => handleCheckboxChange(noneOption.value, true)}
              />
            </>
          )}
        </div>
      </fieldset>
    </div>
  );
};
