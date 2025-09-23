import { ButtonSize } from '../button/types';

type ScoreSelectType = '1-5' | '1-7' | '0-10';

export type ScoreSelectProps = {
  name: string;
  value?: string;
  size?: ButtonSize;
  label: string;
  hint?: string;
  leftLabel?: string;
  rightLabel?: string;
  type: ScoreSelectType;
  orientation?: 'vertical' | 'horizontal';
};
