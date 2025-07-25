import { Children, FC, isValidElement } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
} from '../autocomplete/autocomplete.js';
import { SelectNextProps } from './types.js';

export const SelectSearch: FC<SelectNextProps> = ({
  children,
  onChange,
  ...props
}) => {
  const mappedChildren: any[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    const type = (child.type as any)?.componentType;

    if (type === 'SelectItemNext') {
      const { value, children: label, ...rest } = (child.props || {}) as any;

      mappedChildren.push(
        <AutocompleteItem key={value} value={value} {...rest}>
          {label}
        </AutocompleteItem>,
      );
    }

    if (type === 'SelectGroupItemNext') {
      // TO-DO
    }
  });

  return (
    <Autocomplete {...props} onChange={onChange as any}>
      {mappedChildren}
    </Autocomplete>
  );
};
