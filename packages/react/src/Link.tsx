import _ from 'lodash';
import GiLink, { type Props as GiLinkProps, linkStyles, Underline, Appearance } from '@/atoms/Link';

export type LinkProps = GiLinkProps & {
  inline?: boolean;
  underline?: (typeof Underline)[keyof typeof Underline];
  appearance?: (typeof Appearance)[keyof typeof Appearance];
};

const Link = ({ inline, underline, appearance, className, ...props }: LinkProps) => {
  return (
    <GiLink
      className={
        _.some({ underline, appearance, inline }) ? linkStyles({ underline, appearance, class: className }) : className
      }
      {...props}
    />
  );
};

export default Link;
