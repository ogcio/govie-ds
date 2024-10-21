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

export const Card = (props: CardProps) => {
  const {
    type = 'vertical',
    title,
    inset,
    subTitle,
    img,
    icon,
    content,
    action,
    href,
    tag,
  } = props;

  const getInsetClass = () => {
    if (inset === 'body') {
      return 'gi-card-inset-body';
    } else if (inset === 'full') {
      return 'gi-card-inset-full';
    }
    return 'gi-card-inset-none';
  };

  const layoutClasses = {
    vertical: `gi-card gi-card-vertical ${getInsetClass()}`,
    horizontal: `gi-card gi-card-horizontal ${getInsetClass()}`,
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
            <Icon {...icon} />
          </a>
        </div>
      )}
      <div className={`gi-card-content ${getInsetClass()}`}>
        <div className="gi-card-header">
          <div className="gi-card-heading">
            <Heading
              as="h5"
              customClasses={`!gi-my-0 ${subTitle ? '!gi-mb-2' : ''}`}
            >
              {href ? <Link href={href}>{title}</Link> : title}
            </Heading>
            <Paragraph
              size="sm"
              className="gi-text-gray-600 !gi-font-normal !gi-my-0"
            >
              {subTitle}
            </Paragraph>
          </div>
          {tag && tag.text && tag.type && (
            <div className="gi-card-tag">
              <Tag text={tag.text} type={tag.type} />
            </div>
          )}
        </div>
        <div className="gi-card-paragraph">
          <Paragraph size="sm">{content}</Paragraph>
        </div>
        <div className="gi-card-action">{action && renderAction(action)}</div>
      </div>
    </div>
  );
};

const renderAction = (action: Action) => {
  if (action.type === 'link') {
    return <Link {...action}>{action.children}</Link>;
  }
  return <Button {...action}>{action.children}</Button>;
};

// Set the displayName for debugging purposes
Card.displayName = 'Card';
