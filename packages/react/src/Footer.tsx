import GiFooter, { type Props as GiFooterProps } from '@/atoms/footer/Footer';

export type FooterProps = GiFooterProps & { style?: React.CSSProperties };

export default function Footer({ style, ...props }: FooterProps) {
  return <GiFooter {...props} />;
}
