'use client';
import { HintText } from '../hint-text/hint-text.js';
import { translate as t } from '../i18n/utility.js';
import type { CharacterCountProps } from './types.js';

/**
 * CharacterCount displays the remaining character count for form inputs
 * like TextArea or InputText.
 *
 * This component is designed to be fully decoupled from the input,
 * making it work correctly with both controlled and uncontrolled components,
 * including React Hook Form integration.
 *
 * @example
 * // Controlled usage
 * const [value, setValue] = useState('');
 * <TextArea value={value} onChange={(e) => setValue(e.target.value)} maxLength={100} />
 * <CharacterCount maxChars={100} currentLength={value.length} />
 *
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
