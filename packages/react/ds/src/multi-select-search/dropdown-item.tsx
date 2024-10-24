import { useEffect, useState, useRef } from 'react';
import { CheckboxSizeEnum } from '../checkbox/checkbox.js';
import Checkbox from '../checkbox/checkbox.js';
import CheckboxesGroup from '../checkbox/checkboxes-group.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagType } from '../tag/tag.js';
import { TextInput } from '../text-input/text-input.js';
import { DropdownItemType } from './types.js';

// Add focus

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

  console.log(selectedCheckboxes);
  useEffect(() => {
    let hiddenCheckboxes = 0;
    if (checkboxesRef.current) {
      // apply the css global checkbox components and use it below
      const checkboxes = (
        checkboxesRef.current as HTMLElement
      ).querySelectorAll<HTMLElement>('.gi-items-start');
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
      // apply the css global checkbox components and use it below
      const checkboxes = (
        checkboxesRef.current as HTMLElement
      ).querySelectorAll<HTMLElement>('.gi-items-start');

      for (const checkbox of checkboxes) {
        const input = checkbox.querySelector('input');

        if (input?.checked) {
          selectedCheckbox++;
        }
      }
      setSelectedCheckboxes(selectedCheckbox);
    }
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hover:gi-bg-gray-200 gi-border-b gi-px-2 gi-py-4 gi-flex gi-justify-between gi-cursor-pointer"
      >
        <div className="gi-flex">
          <Paragraph size="sm">{label}</Paragraph>
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
        className={`gi-bg-gray-50 gi-py-4 gi-px-3 gi-relative ${isOpen ? 'gi-block' : 'gi-hidden'}`}
      >
        {!noSearch && (
          <>
            <TextInput
              className="gi-pt-0 gi-pb-0"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            {searchInput && (
              <Icon
                className="gi-absolute gi-right-6 gi-top-8 gi-z-100"
                onClick={() => setSearchInput('')}
                icon="close"
              />
            )}
          </>
        )}

        <div className="gi-h-64 gi-overflow-scroll" ref={checkboxesRef}>
          {noResults && (
            <Paragraph className="!gi-text-center">No results found.</Paragraph>
          )}
          {options.map((checkbox) => (
            <Checkbox
              onChange={handleCheckbox}
              dataElement={checkbox.label}
              checkboxId={checkbox.label}
              size={CheckboxSizeEnum.Small}
              label={checkbox.label}
              value={checkbox.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
