import { Props as ButtonProps } from '../atoms/Button';

type ScoreSelectType = '1-5' | '1-7' | '0-10';

export type ScoreSelectProps = {
  name: string;
  value?: string;
  size?: ButtonProps['size'];
  label: string;
  hint?: string;
  leftLabel?: string;
  rightLabel?: string;
  type: ScoreSelectType;
  orientation?: 'vertical' | 'horizontal';
  startLabel?: string;
  endLabel?: string;
  wrapInMobile?: boolean;
  onChange?: (value: string) => void;
};
