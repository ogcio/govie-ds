export type InputFileProps = {
  dataTestid?: string;
} & React.InputHTMLAttributes<Omit<HTMLInputElement, 'type'>>;
