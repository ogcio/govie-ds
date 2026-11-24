import CoreFooterSection, { type Props } from '@/atoms/footer/FooterSection';

export type FooterSectionProps = Omit<Props, 'styles'> & {
  style?: React.CSSProperties;
};

export default function FooterSection({ style, ...props }: FooterSectionProps) {
  return <CoreFooterSection {...props} styles={style as Record<string, string>} />;
}
