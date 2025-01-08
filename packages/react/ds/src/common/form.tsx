import React from 'react';

type FormType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form = ({ children, ...props }: FormType) => {
  return <form {...props}>{children}</form>;
};
