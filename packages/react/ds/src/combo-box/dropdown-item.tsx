'use client';
import { useEffect, useId, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox.js';
import { CheckboxSizeEnum } from '../checkbox/types.js';
import { cn } from '../cn.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagTypeEnum } from '../tag/tag.js';
import { TextInput } from '../text-input/text-input.js';
import { slugify } from '../utilities.ts.js';
import { DropdownItemProps } from './types.js';
export const DropdownItem = ({
  children,
  noSearch,
  options,
  value,
  defaultValue = [],
  onChange,
  onSearch,
}: DropdownItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
  const dropdownCustomClass = children
    ? `${slugify(`${children}-${useId()}`)}`
    : '';

  const isControlled = value !== undefined;
  const selected = isControlled ? value : selectedValues;

  const getCheckboxes = () => [
    ...globalThis.window.document.querySelectorAll<HTMLElement>(
      `div.gi-combobox-checkbox.gi-combobox-key-${dropdownCustomClass}`,
    ),
  ];

  useEffect(() => {
    let hiddenCheckboxes = 0;
    const checkboxes = getCheckboxes();
    for (const checkbox of checkboxes) {
      const label = checkbox.querySelector('label')?.textContent;
      if (label?.toLowerCase()?.includes(searchInput.toLowerCase())) {
        checkbox.style.display = 'flex';
      } else {
        checkbox.style.display = 'none';
        hiddenCheckboxes++;
      }
    }

    setNoResults(hiddenCheckboxes === options.length);
  }, [searchInput, options.length]);

  const handleChange = (checkboxValue: string, checked: boolean) => {
    const updatedValues = checked
      ? [...(selected || []), checkboxValue]
      : (selected || []).filter((value_) => value_ !== checkboxValue);

    if (!isControlled) {
      setSelectedValues(updatedValues);
    }

    onChange?.(updatedValues);
  };

  return (
    <div role="group" aria-label={`${children} dropdown`}>
      <button
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`gi-combobox-toggle ${isOpen && 'gi-combobox-toggle-open'}`}
      >
        <div className="gi-combobox-toggle-content">
          <Paragraph size="md">{children}</Paragraph>
          {selected?.length > 0 && (
            <Tag type={TagTypeEnum.Counter} text={selected.length.toString()} />
          )}
        </div>

        <Icon
          className={`${isOpen && 'gi-rotate-180'}`}
          icon="keyboard_arrow_down"
        />
      </button>

      <div
        className={`${
          isOpen ? 'gi-combobox-dropdown-container-open' : 'gi-hidden'
        }`}
        id={`${dropdownCustomClass}-search`}
      >
        {!noSearch && (
          <div className="gi-combobox-search">
            {/* TODO translation for "Search" */}
            <TextInput
              placeholder="Search"
              className="gi-combobox-search-input"
              value={searchInput}
              onChange={(event) => {
                const newValue = event.target.value;
                setSearchInput(newValue);
                onSearch?.(newValue);
              }}
            />
            {searchInput && (
              <IconButton
                variant="flat"
                appearance="dark"
                size="small"
                className="gi-combobox-search-icon"
                onClick={() => {
                  onSearch?.('');
                  setSearchInput('');
                }}
                icon={{
                  icon: 'close',
                }}
              />
            )}
          </div>
        )}

        <div
          className={cn('gi-combobox-checkbox-container', {
            'gi-h-64': !noSearch,
          })}
        >
          {/* TODO translation for "No results found." */}
          {noResults && (
            <Paragraph className="gi-combobox-checkbox-paragraph">
              No results found.
            </Paragraph>
          )}
          {options.map((checkbox, index) => {
            const checked = selected?.includes(checkbox.value);
            return (
              <div
                key={`${index}_${dropdownCustomClass}_${checkbox.value}`}
                className={`gi-combobox-checkbox gi-combobox-key-${dropdownCustomClass}`}
              >
                <Checkbox
                  onChange={(event) =>
                    handleChange(checkbox.value, event.target.checked)
                  }
                  checked={checked}
                  id={`${index}_${dropdownCustomClass}_${checkbox.value}`}
                  size={CheckboxSizeEnum.Small}
                  label={checkbox.label}
                  name={`${index}_${checkbox.label}_${dropdownCustomClass}`}
                  value={checkbox.value}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
