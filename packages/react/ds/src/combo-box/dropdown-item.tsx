'use client';
import { useEffect, useState, useRef } from 'react';
import { CheckboxSizeEnum } from '../checkbox/checkbox.js';
import Checkbox from '../checkbox/checkbox.js';
import { Icon } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagType } from '../tag/tag.js';
import { TextInput } from '../text-input/text-input.js';
import { DropdownItemType } from './types.js';

export const DropdownItem = ({
  label,
  noSearch,
  options,
}: DropdownItemType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(0);
  const checkboxesRef = useRef(null);

  useEffect(() => {
    let hiddenCheckboxes = 0;
    if (checkboxesRef.current) {
      const checkboxes = (
        checkboxesRef.current as HTMLElement
      ).querySelectorAll<HTMLElement>('.gi-combobox-checkbox');
      for (const checkbox of checkboxes) {
        const label = checkbox.querySelector('label')?.textContent;

        if (label?.toLowerCase().includes(searchInput.toLowerCase())) {
          checkbox.style.display = 'flex';
        } else {
          checkbox.style.display = 'none';
          hiddenCheckboxes++;
        }
      }

      hiddenCheckboxes === options.length
        ? setNoResults(true)
        : setNoResults(false);
    }
  }, [searchInput]);

  const handleCheckbox = () => {
    let selectedCheckbox = 0;
    if (checkboxesRef.current) {
      const checkboxes = (
        checkboxesRef.current as HTMLElement
      ).querySelectorAll<HTMLElement>('.gi-combobox-checkbox');

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
    }
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className="gi-combobox-toggle">
        <div className="gi-combobox-toggle-content">
          <Paragraph size="md">{label}</Paragraph>
          {selectedCheckboxes !== 0 && (
            <Tag type={TagType.counter} text={selectedCheckboxes.toString()} />
          )}
        </div>

        <Icon
          className={`${isOpen && 'gi-rotate-180'}`}
          icon="keyboard_arrow_down"
        />
      </div>

      <div
        className={`${isOpen ? 'gi-combobox-dropdown-container-open' : 'gi-hidden'}`}
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

        <div className="gi-combobox-checkbox-container" ref={checkboxesRef}>
          {noResults && (
            <Paragraph className="gi-combobox-checkbox-paragraph">
              No results found.
            </Paragraph>
          )}
          {options.map((checkbox, index) => (
            <Checkbox
              key={index}
              onChange={handleCheckbox}
              dataElement={checkbox.label}
              checkboxId={checkbox.label}
              size={CheckboxSizeEnum.Small}
              label={checkbox.label}
              value={checkbox.value}
              className="gi-combobox-checkbox"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
