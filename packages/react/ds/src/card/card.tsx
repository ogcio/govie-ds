import { useMemo } from 'react';
import { Button } from '../button/button.js';
import { ButtonProps } from '../button/types.js';
import { Icon, IconPropTypes } from '../icon/icon.js';
import { Link, LinkProps } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagProps } from '../tag/tag.js';

type Action =
  | (ButtonProps & { type: 'button' })
  | (LinkProps & { type: 'link' });

export type CardProps = {
  type: 'vertical' | 'horizontal';
  inset?: 'body' | 'full' | 'none';
  title?: string;
  subTitle?: string;
  href?: string;
  img?: string;
  tag?: TagProps;
  icon?: IconPropTypes;
  content?: string;
  action?: Action;
};

export const Card = ({
  type = 'vertical',
  title,
  inset = 'none',
  subTitle,
  img,
  icon,
  content,
  action,
  href,
  tag,
}: CardProps) => {
  const cardClasses = useMemo(() => {
    const insetClass = `gi-card-inset-${inset}`;
    return `gi-card gi-card-${type} ${insetClass}`;
  }, [type, inset]);

  const renderMedia = () => {
    if (img && !icon) {
      return (
        <div className="gi-card-image">
          <a href={href}>
            <img src={img} alt={title} />
          </a>
        </div>
      );
    }

    if (icon) {
      return (
        <div className="gi-card-icon">
          <a href={href}>
            <Icon {...icon} />
          </a>
        </div>
      );
    }

    return null;
  };

  const renderTitle = () => {
    const titleContent = href ? <Link href={href}>{title}</Link> : title;

    return (
      <div className={`gi-card-title ${subTitle ? '!gi-mb-2' : ''}`}>
        {titleContent}
      </div>
    );
  };

  const renderAction = (action: Action) => {
    if (action.type === 'link') {
      return <Link {...action}>{action.children}</Link>;
    }
    return <Button {...action}>{action.children}</Button>;
  };

  return (
    <div className={cardClasses}>
      {renderMedia()}
      <div className={`gi-card-content gi-card-inset-${inset}`}>
        <div className="gi-card-header">
          <div className="gi-card-heading">
            {renderTitle()}
            {subTitle && <div className="gi-card-subheading">{subTitle}</div>}
          </div>
          {tag?.text && tag.type && (
            <div className="gi-card-tag">
              <Tag text={tag.text} type={tag.type} />
            </div>
          )}
        </div>
        {content && (
          <div className="gi-card-paragraph">
            <Paragraph size="sm">{content}</Paragraph>
          </div>
        )}
        {action && <div className="gi-card-action">{renderAction(action)}</div>}
      </div>
    </div>
  );
};

// Set the displayName for debugging purposes
Card.displayName = 'Card';
