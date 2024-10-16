import { Heading } from '../heading/heading.js';
import { Icon, IconPropTypes } from '../icon/icon.js';
import { Link, LinkProps } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagProps } from '../tag/tag.js';
import { ButtonProps } from '../button/types.js';
import { Button } from '../button/button.js';

type Action =
  | (ButtonProps & { type: 'button' })
  | (LinkProps & { type: 'link' });

export type CardProps = {
  type: 'vertical' | 'horizontal';
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
    subTitle,
    img,
    icon,
    content,
    action,
    href,
    tag,
  } = props;
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
            <Icon {...icon} />
          </a>
        </div>
      )}
      <div className="gi-card-content">
        <div className="gi-card-header">
          <div className="gi-card-heading">
            <Heading as="h5" customClasses="!gi-my-0">
              {href ? <Link href={href}>{title}</Link> : title}
            </Heading>
            <Heading
              as="h6"
              size="2xs"
              customClasses="gi-text-gray-500 !gi-font-normal !gi-my-0"
            >
              {subTitle}
            </Heading>
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
        {action && renderAction(action)}
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
