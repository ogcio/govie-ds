import { ErrorText } from '../error-text/error-text.js';
import { Heading, HeadingAs, HeadingSize } from '../heading/heading.js';
import { HintText } from '../hint-text/hint-text.js';
import Checkbox, { CheckboxSizeEnum } from './checkbox.js';

type CheckboxesGroupType = {
  size?: CheckboxSizeEnum;
  fieldId: string;
  errorMessage?: string;
  items: {
    value: string;
    label?: string;
    hint?: string;
  }[];
  title: {
    value: string;
    asHeading?: {
      size: HeadingSize;
      tag: HeadingAs;
    };
    hint?: string;
  };
};

const CheckboxesGroup = ({
  fieldId,
  errorMessage,
  title,
  items,
  size,
}: CheckboxesGroupType) => {
  return (
    <div className="gi-flex">
      {errorMessage && (
        <div className="gi-w-4 gi-border-l-lg gi-border-l-red-600 gi-border-solid"></div>
      )}
      <fieldset>
        <legend className="gi-mb-3.5 sm:gi-text-sm md:gi-text-md lg:gi-text-lg">
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
              text={title.hint}
              className="!gi-mb-[var(--gieds-space-2)]"
            />
          )}
        </legend>
        <div className="gi-flex gi-flex-col gi-gap-2.5">
          {errorMessage && (
            <ErrorText text={errorMessage} className="gi-mb-0" />
          )}
          {items.map((checkbox, index) => (
            <Checkbox
              dataElement={`checkbox${index}`}
              size={size}
              checkboxId={`${fieldId}-${index}`}
              hint={checkbox.hint}
              value={checkbox.value}
              label={checkbox.label}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default CheckboxesGroup;
