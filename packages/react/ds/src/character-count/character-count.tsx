'use client';
import { HintText } from '../hint-text/hint-text.js';
import { translate as t } from '../i18n/utility.js';
import type { CharacterCountProps } from './types.js';

/**
 * CharacterCount displays the remaining character count for form inputs
 * like TextArea or InputText.
 */
export const CharacterCount: React.FC<CharacterCountProps> = ({
  maxChars,
  currentLength,
}) => {
  const remainingChars = maxChars - currentLength;

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
