type LogoProps = {
  imageSmall?: string;
  imageLarge?: string;
  href?: string;
  external?: boolean;
  alt?: string;
};

export type FooterProps = {
  primarySlot?: any;
  secondarySlot?: any;
  utilitySlot?: any;
  logo?: LogoProps;
  className?: string;
  dataTestid?: string;
};
