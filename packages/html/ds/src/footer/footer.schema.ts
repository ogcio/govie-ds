type LogoProps = {
  href?: string;
  src?: string;
  external?: boolean;
  alt?: string;
};

export type FooterProps = {
  primarySlot?: any;
  secondarySlot?: any;
  utilitySlot?: any;
  logo?: LogoProps;
  class?: string;
  dataTestid?: string;
};
