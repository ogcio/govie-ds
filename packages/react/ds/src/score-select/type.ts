import { ButtonSize } from '../button/types.js';

type Option = {
  value: string;
  label: string;
};

export type ScoreSelectProps = {
  name: string;
  size?: ButtonSize;
  options: Option[];
  defaultValue?: string;
  label: string;
  hint?: string;
  leftLabel?: string;
  middleLabel?: string;
  rightLabel?: string;
  onChange?: (value: string) => void;
};
