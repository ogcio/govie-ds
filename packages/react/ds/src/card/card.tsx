import React, { cloneElement, ReactElement } from 'react';
import { Link } from '../link/link.js';
import { Heading } from '../heading/heading.js';
import { Paragraph } from '../paragraph/paragraph.js';

type Action = {
  href: string;
  text: string;
};

export type CardProps = {
  type: 'vertical' | 'horizontal';
  title?: string;
  href?: string;
  img?: string;
  icon?: ReactElement;
  content?: string;
  actions?: Action[];
};

export const Card = (props: CardProps) => {
  const { type = 'vertical', title, img, icon, content, actions, href } = props;
  const layoutClasses = {
    vertical: 'gi-card gi-card-vertical',
    horizontal: 'gi-card gi-card-horizontal',
  };

  return (
    <div className={layoutClasses[type]}>
      {img && !icon && (
        <div className="gi-card-image">
          <a href={href}>
            <img src={img} alt={title} />
          </a>
        </div>
      )}
      {icon && (
        <div className="gi-card-image">
          <a href={href}>
            {cloneElement(icon, {
              ariaLabel: undefined,
              ariaHidden: true,
            })}
          </a>
        </div>
      )}
      <div className="gi-card-content">
        <div className="gi-card-heading">
          {href ? (
            <Heading as="h5" customClasses="!gi-mt-0 !gi-mb-0">
              <Link href={href}>{title}</Link>
            </Heading>
          ) : (
            <Heading as="h5" customClasses="!gi-mt-0 !gi-mb-0">
              {title}
            </Heading>
          )}
        </div>
        <div className="gi-card-paragraph">
          <Paragraph size="sm">{content}</Paragraph>
        </div>
        {actions?.map((action, index) => (
          <Link key={index} href={action.href} size="md">
            {action.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Set the displayName for debugging purposes
Card.displayName = 'Card';
