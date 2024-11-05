'use client';
import { useState } from 'react';
import { ErrorText } from '../error-text/error-text.js';
import { Heading } from '../heading/heading.js';
import { HintText } from '../hint-text/hint-text.js';
import { Radio, getRadioWidth } from './radio.js';
import { RadiosGroupType } from './types.js';

export const RadiosGroup = ({
  fieldId,
  items,
  inline,
  size,
  errorMessage,
  dividerOption,
  title,
}: RadiosGroupType) => {
  const [value, setValue] = useState<null | string>(null);

  const onOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="gi-radio-group-container" data-testid="govie-radios">
      {errorMessage && <div className="gi-radio-group-error"></div>}
      <fieldset>
        {title && (
          <legend className="gi-radio-group-legend">
            {title.asHeading ? (
              <Heading
                customClasses="!gi-mb-2"
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
                key={`${value}-${index}`}
                checked={value === radio.value}
                onChange={onOptionChange}
                name={fieldId}
                label={radio.label}
                value={radio.value}
                hint={radio.hint}
                radioId={`${fieldId}-${index}`}
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
                  checked={value === dividerOption.value}
                  onChange={onOptionChange}
                  name={fieldId}
                  label={dividerOption.label}
                  value={dividerOption.value}
                  hint={dividerOption.hint}
                  radioId={`${fieldId}-${items.length}`}
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
