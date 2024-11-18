'use client';
import { useState } from 'react';
import { ErrorText } from '../error-text/error-text.js';
import { Heading } from '../heading/heading.js';
import { HintText } from '../hint-text/hint-text.js';
import { Radio, getRadioWidth } from './radio.js';
import type { RadiosGroupType } from './types.js';

export const RadiosGroup = ({
  groupId,
  items,
  inline,
  size,
  errorMessage,
  dividerOption,
  title,
  onChange,
  defaultValue,
}: RadiosGroupType) => {
  const initialValue =
    items.find((radio) => radio.value === defaultValue)?.value ?? null;
  const [value, setValue] = useState<null | string>(initialValue);

  const onOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className="gi-radio-group-container" data-testid="govie-radios">
      {errorMessage && <div className="gi-radio-group-error"></div>}
      <fieldset>
        {title && (
          <legend className="gi-radio-group-legend">
            {title.asHeading ? (
              <Heading
                className="!gi-mb-2"
                size={title.asHeading.size}
                as={title.asHeading.as}
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
                className="!gi-mb-2"
              />
            )}
          </legend>
        )}
        <div className="gi-radio-group-options-container">
          {errorMessage && (
            <ErrorText text={errorMessage} className="!gi-mb-0" />
          )}
          <div
            className={`${inline ? 'gi-radio-group-options-inline' : 'gi-radio-group-options-stacked'}`}
          >
            {items.map((radio, index) => (
              <Radio
                key={`${groupId}-${index}`}
                checked={value === radio.value}
                onChange={onOptionChange}
                name={groupId}
                label={radio.label}
                value={radio.value}
                hint={radio.hint}
                id={`${groupId}-${index}`}
                size={size}
                conditionalInput={radio.conditionalInput}
              />
            ))}
            {dividerOption && (
              <div
                className={`gi-radio-group-options-stacked ${inline ? '!gi-flex-row' : '!gi-flex-col'} `}
              >
                <p
                  className={`gi-radio-group-options-divider-text ${getRadioWidth(size)}`}
                >
                  or
                </p>
                <Radio
                  key={`${groupId}-${items.length}`}
                  checked={value === dividerOption.value}
                  onChange={onOptionChange}
                  name={groupId}
                  label={dividerOption.label}
                  value={dividerOption.value}
                  hint={dividerOption.hint}
                  id={`${groupId}-${items.length}`}
                  size={size}
                  conditionalInput={dividerOption.conditionalInput}
                />
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
};
