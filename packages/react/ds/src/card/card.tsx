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

type ImagePropTypes = {
  src: string;
  alt?: string;
};

type IframePropTypes = {
  src: string;
  title?: string;
  allowFullScreen?: boolean;
  allow?: string;
};

type MediaContent =
  | {
      type: 'image';
      config: ImagePropTypes;
    }
  | {
      type: 'icon';
      config: IconPropTypes;
    }
  | {
      type: 'iframe';
      config: IframePropTypes;
    };

export type CardProps = {
  type: 'vertical' | 'horizontal';
  inset?: 'body' | 'full' | 'none';
  title?: string;
  subTitle?: string;
  href?: string;
  media?: MediaContent;
  tag?: TagProps;
  content?: string;
  action?: Action;
};

export const Card = ({
  type = 'vertical',
  title,
  inset = 'none',
  subTitle,
  media,
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
    if (!media) {
      return null;
    }

    switch (media.type) {
      case 'image': {
        return (
          <div className="gi-card-image">
            <a href={href}>
              <img src={media.config.src} alt={media.config.alt || title} />
            </a>
          </div>
        );
      }
      case 'icon': {
        return (
          <div className="gi-card-icon">
            <a href={href}>
              <Icon {...media.config} />
            </a>
          </div>
        );
      }
      case 'iframe': {
        return (
          <div className="gi-card-iframe">
            <iframe {...media.config} />
          </div>
        );
      }
      default: {
        return null;
      }
    }
  };

  const renderTitle = () => {
    const titleContent = href ? <Link href={href}>{title}</Link> : title;
    return <div className="gi-card-title">{titleContent}</div>;
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

Card.displayName = 'Card';
