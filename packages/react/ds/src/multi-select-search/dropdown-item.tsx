import { useState } from 'react';
import Checkbox from '../checkbox/checkbox.js';
import CheckboxesGroup from '../checkbox/checkboxes-group.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { TextInput } from '../text-input/text-input.js';
import { DropdownItemType } from './types.js';

// Add focus
// Add chip
// Add Search component

export const DropdownItem = ({
  label,
  withSearch,
  options,
}: DropdownItemType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hover:gi-bg-gray-200 gi-border-b gi-px-2 gi-py-4 gi-flex gi-justify-between gi-cursor-pointer"
      >
        <Paragraph size="sm">{label}</Paragraph>
        <Icon
          className={`${isOpen && 'gi-rotate-180'}`}
          icon="keyboard_arrow_down"
        />
      </div>

      <div
        className={`gi-bg-gray-50 gi-py-4 gi-px-3 gi-relative ${isOpen ? 'gi-block' : 'gi-hidden'}`}
      >
        <TextInput
          className="gi-pt-0 gi-pb-0"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        {searchInput && (
          <Icon
            className="gi-absolute gi-right-6 gi-top-6 gi-z-100"
            onClick={() => setSearchInput('')}
            icon="close"
          />
        )}

        <div>
          <CheckboxesGroup
            size="sm"
            title={{ value: 'test' }}
            fieldId="test" // change this to something unique
            items={options}
          />
        </div>
      </div>
    </div>
  );
};
