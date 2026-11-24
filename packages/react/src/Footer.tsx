import CoreFooter, { type Props } from '@/atoms/footer/Footer';

export type FooterProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function Footer({ style, ...props }: FooterProps) {
  return <CoreFooter {...props} styles={style as Record<string, string>} />;
}
