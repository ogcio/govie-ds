import { Slottable } from '@radix-ui/react-slot';
import React from 'react';
import { cn } from '../../cn.js';
import { ErrorText } from '../../error-text/error-text.js';
import type { ErrorTextProps } from '../../error-text/types.js';
import { HintText } from '../../hint-text/hint-text.js';
import type { HintTextProps } from '../../hint-text/types.js';
import { translate as t } from '../../i18n/utility.js';
import { Label } from '../../label/label.js';
import type { LabelTextProps } from '../../label/types.js';
import { Tag, TagProps } from '../../tag/tag.js';

/**
 * @deprecated This type is deprecated and will be removed in a future release.
 * Please use the new FormFieldProps component instead.
 */
export type FormFieldWithTagProps = {
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelTextProps;
  className?: string;
  tag?: TagProps;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

/**
 * @deprecated This component is deprecated and will be removed in a future release.
 * Please use the new FormField component instead.
 */
export const FormFieldWithTag = ({
  label,
  hint,
  error,
  children,
  className,
  tag,
}: FormFieldWithTagProps) => {
  return (
    <fieldset className={cn({ 'gi-error-state': error }, className)}>
      <div className="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
        <div>
          <div className="gi-flex gi-items-center gi-justify-between">
            {label?.text && (
              <Label
                text={label.text}
                size={label.size}
                htmlFor={label.htmlFor}
                className="gi-font-bold"
              >
                {label.children}
              </Label>
            )}
            {tag?.text && tag.type && (
              <div
                aria-label={t('formField.tag', {
                  tag: tag.text,
                  defaultValue: `Tag: ${tag.text}`,
                })}
              >
                <Tag text={tag.text} type={tag.type} />
              </div>
            )}
          </div>

          {hint?.text && (
            <HintText text={hint.text} size={hint.size} className="gi-mb-1" />
          )}
        </div>
        {error?.text && (
          <ErrorText text={error.text} size={error.size} className="gi-mb-1" />
        )}
      </div>

      <Slottable>{children}</Slottable>
    </fieldset>
  );
};

FormFieldWithTag.displayName = 'FormFieldWithTag';
