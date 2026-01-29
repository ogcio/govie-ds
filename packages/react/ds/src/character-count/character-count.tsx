'use client';
import { HintText } from '../hint-text/hint-text.js';
import { translate as t } from '../i18n/utility.js';
import type { CharacterCountProps } from './types.js';

/**
 * CharacterCount displays the remaining character count for textarea-based
 * inputs, such as the TextArea component.
 */
export const CharacterCount: React.FC<CharacterCountProps> = ({
  maxChars,
  value,
}) => {
  const remainingChars = Math.max(0, maxChars - value.length);

  return (
    <div className="gi-textarea-remaining-chars">
      <HintText
        text={t('textarea.remainingChars', {
          remainingChars,
          defaultValue: `You have ${remainingChars} characters remaining`,
        })}
      />
    </div>
  );
};

CharacterCount.displayName = 'CharacterCount';
