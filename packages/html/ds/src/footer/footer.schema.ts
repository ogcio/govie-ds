type LogoProps = {
  href?: string;
  src?: string;
  external?: boolean;
  alt?: string;
};

export type FooterProps = {
  primarySlot?: string;
  secondarySlot?: string;
  utilitySlot?: string;
  logo?: LogoProps;
  class?: string;
  dataTestid?: string;
};
