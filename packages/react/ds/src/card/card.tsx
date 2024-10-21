import { useMemo } from 'react';
import { Button } from '../button/button.js';
import { ButtonProps } from '../button/types.js';
import { Heading } from '../heading/heading.js';
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

// Memoized truncation utility
const useTruncatedText = (text: string | undefined, maxLength: number) => {
  return useMemo(() => {
    if (!text) {
      return '';
    }
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, [text, maxLength]);
};

const CONTENT_MAX_LENGTH = 120;
const TITLE_MAX_LENGTH = 60;

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
  const truncatedContent = useTruncatedText(content, CONTENT_MAX_LENGTH);
  const truncatedTitle = useTruncatedText(title, TITLE_MAX_LENGTH);
  const truncatedSubTitle = useTruncatedText(subTitle, TITLE_MAX_LENGTH);

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
    const titleContent = href ? (
      <Link href={href}>{truncatedTitle}</Link>
    ) : (
      truncatedTitle
    );

    return (
      <Heading
        as="h5"
        customClasses={`!gi-my-0 ${truncatedSubTitle ? '!gi-mb-2' : ''}`}
      >
        {titleContent}
      </Heading>
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
            {truncatedSubTitle && (
              <Paragraph size="sm" className="gi-card-subheading">
                {truncatedSubTitle}
              </Paragraph>
            )}
          </div>
          {tag?.text && tag.type && (
            <div className="gi-card-tag">
              <Tag text={tag.text} type={tag.type} />
            </div>
          )}
        </div>
        {truncatedContent && (
          <div className="gi-card-paragraph">
            <Paragraph size="sm">{truncatedContent}</Paragraph>
          </div>
        )}
        {action && <div className="gi-card-action">{renderAction(action)}</div>}
      </div>
    </div>
  );
};

// Set the displayName for debugging purposes
Card.displayName = 'Card';
