import CoreFooterLogo, { type Props } from '@/atoms/footer/FooterLogo';

export type FooterLogoProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function FooterLogo({ style, ...props }: FooterLogoProps) {
  return <CoreFooterLogo {...props} styles={style as Record<string, string>} />;
}
