'use client';
import { useEffect, useState, useId } from 'react';
import { Checkbox } from '../checkbox/checkbox.js';
import { CheckboxSizeEnum } from '../checkbox/types.js';
import { Icon } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagTypeEnum } from '../tag/tag.js';
import { TextInput } from '../text-input/text-input.js';
import { slugify } from '../utils.js';
import { DropdownItemType } from './types.js';

export const DropdownItem = ({
  children,
  noSearch,
  options,
}: DropdownItemType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(0);
  const dropdownCustomClass = children
    ? `${slugify(`${children}-${useId()}`)}`
    : '';

  const getCheckboxes = () => [
    ...window.document.querySelectorAll<HTMLElement>(
      `div.gi-combobox-checkbox.gi-combobox-key-${dropdownCustomClass}`,
    ),
  ];

  useEffect(() => {
    let hiddenCheckboxes = 0;
    const checkboxes = getCheckboxes();
    for (const checkbox of checkboxes) {
      const label = checkbox.querySelector('label')?.textContent;

      if (label?.toLowerCase()?.includes(searchInput?.toLowerCase())) {
        checkbox.style.display = 'flex';
      } else {
        checkbox.style.display = 'none';
        hiddenCheckboxes++;
      }
    }

    hiddenCheckboxes === options.length
      ? setNoResults(true)
      : setNoResults(false);
  }, [searchInput]);

  const handleCheckbox = () => {
    let selectedCheckbox = 0;
    const checkboxes = getCheckboxes();

    for (const checkbox of checkboxes) {
      const input = checkbox.querySelector('input');
      const label = checkbox.querySelector('label');

      if (input?.checked) {
        checkbox.classList.add('hover:gi-bg-gray-50');
        label?.classList.add('gi-font-bold');
        selectedCheckbox++;
      } else {
        checkbox.classList.remove('hover:gi-bg-gray-50');
        label?.classList.remove('gi-font-bold');
      }
    }
    setSelectedCheckboxes(selectedCheckbox);
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
          {selectedCheckboxes !== 0 && (
            <Tag
              type={TagTypeEnum.COUNTER}
              text={selectedCheckboxes.toString()}
            />
          )}
        </div>

        <Icon
          className={`${isOpen && 'gi-rotate-180'}`}
          icon="keyboard_arrow_down"
        />
      </button>

      <div
        className={`${isOpen ? 'gi-combobox-dropdown-container-open' : 'gi-hidden'}`}
        id={`${dropdownCustomClass}-search`}
      >
        {!noSearch && (
          <div className="gi-combobox-search">
            <TextInput
              placeholder="Search"
              className="gi-combobox-search-input"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            {searchInput && (
              <IconButton
                variant="flat"
                appearance="dark"
                size="small"
                className="gi-combobox-search-icon"
                onClick={() => setSearchInput('')}
                icon={{
                  icon: 'close',
                }}
              />
            )}
          </div>
        )}

        <div className="gi-combobox-checkbox-container">
          {noResults && (
            <Paragraph className="gi-combobox-checkbox-paragraph">
              No results found.
            </Paragraph>
          )}
          {options.map((checkbox, index) => {
            return (
              <div
                key={`${index}_${dropdownCustomClass}_${checkbox.value}`}
                className={`gi-combobox-checkbox gi-combobox-key-${dropdownCustomClass}`}
              >
                <Checkbox
                  key={`${index}_${dropdownCustomClass}_${checkbox.value}`}
                  onChange={handleCheckbox}
                  id={`${index}_${dropdownCustomClass}_${checkbox.value}`}
                  size={CheckboxSizeEnum.SMALL}
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
