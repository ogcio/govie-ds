import React from 'react';
import type { SummaryListProps } from './types.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';

const SummaryList = ({ items }: SummaryListProps) => {
  return (
    <dl className="gi-summary-list">
      {items.map(({ key, value, actionText, actionHref }, index) => (
        <div className="gi-summary-list-row" key={index}>
          <dt className="gi-summary-list-key">{key}</dt>
          <dd className="gi-summary-list-value">
            {Array.isArray(value)
              ? value.map((val, i) => <p key={`${val}_${i}`}>{val}</p>)
              : value}
          </dd>
          {actionText && actionHref && (
            <dd className="gi-summary-list-actions">
              <Link href={actionHref}>{actionText}</Link>
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
};

export default SummaryList;
