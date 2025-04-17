import { ButtonSize } from '../button/types';

type ButtonOption = {
  label: string;
  value: string;
};

export type ScoreSelectProps = {
  name: string;
  size?: ButtonSize;
  defaultValue?: string;
  options?: ButtonOption[];
  label?: string;
  hint?: string;
  leftLabel?: string;
  rightLabel?: string;
};
