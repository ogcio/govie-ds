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
    <div className="gi-flex">
      {errorMessage && (
        <div className="gi-w-5 gi-border-l-[5px] gi-border-l-red-600 gi-border-solid"></div>
      )}
      <fieldset>
        {title && (
          <legend className="sm:gi-text-sm md:gi-text-md lg:gi-text-lg">
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
            {title.hint && <HintText text={title.hint} className="!gi-mb-2" />}
          </legend>
        )}
        <div className="gi-flex gi-flex-col gi-gap-2.5">
          {errorMessage && (
            <ErrorText text={errorMessage} className='!gi-mb-0' />
          )}
          <div
            className={`gi-flex ${inline ? 'gi-flex-row gi-gap-4' : 'gi-flex-col gi-gap-2.5'}`}
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
                className={`gi-flex gi-gap-2.5 gi-flex-col ${inline ? '!gi-flex-row' : '!gi-flex-col'} `}
              >
                <p
                  className={`gi-text-center xs:gi-text-sm md:gi-text-md lg:gi-text-lg ${getRadioWidth(size)}`}
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
