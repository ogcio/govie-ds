export type HeadingProps = {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  caption?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;
