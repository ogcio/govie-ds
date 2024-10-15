import React, { cloneElement, ReactElement } from 'react';
import { Heading } from '../heading/heading.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { IconPropTypes } from '../icon/icon.js';

type Action = {
  href: string;
  text: string;
};

export type CardProps = {
  type: 'vertical' | 'horizontal';
  title?: string;
  href?: string;
  img?: string;
  icon?: ReactElement<IconPropTypes>;
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
        <div className="gi-card-icon">
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
          <Heading as="h5" customClasses="!gi-my-0">
            {href ? <Link href={href}>{title}</Link> : title}
          </Heading>
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
