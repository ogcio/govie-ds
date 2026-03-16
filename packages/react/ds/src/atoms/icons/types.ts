export type BaseSVGProps = {
  id?: string;
  className?: string;
  label?: string;
  size?: string | number;
  dataTestId?: string;
};
export type IconProps = BaseSVGProps & {
  color?: string;
};
export type IconSize = 'sm' | 'md' | 'lg' | 'xl'