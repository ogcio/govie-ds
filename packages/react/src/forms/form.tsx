import React from 'react';

type FormType = React.FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, ...props }: FormType) => {
  return <form {...props}>{children}</form>;
};
