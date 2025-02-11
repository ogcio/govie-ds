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
  aspectRatio?: '4/3' | '1/1' | `${number}/${number}`;
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
  dataTestid?: string;
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
  dataTestid,
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
        const { src, alt, aspectRatio } = media.config;
        return (
          <div className="gi-card-image" aria-label={alt || title}>
            <a href={href}>
              <img
                src={src}
                alt={alt || title}
                style={aspectRatio ? { aspectRatio } : undefined}
                className={aspectRatio ? 'gi-w-full' : undefined}
              />
            </a>
          </div>
        );
      }
      case 'icon': {
        return (
          <div className="gi-card-icon" aria-hidden="true">
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
    const titleContent = href ? (
      <Link href={href} aria-label={`Card link: ${title}`}>
        {title}
      </Link>
    ) : (
      title
    );
    return <div className="gi-card-title">{titleContent}</div>;
  };

  const renderAction = (action: Action) => {
    if (action.type === 'link') {
      return (
        <Link {...action} aria-label={`Action link: ${action.children}`}>
          {action.children}
        </Link>
      );
    }
    return (
      <Button {...action} aria-label={`Action button: ${action.children}`}>
        {action.children}
      </Button>
    );
  };

  return (
    <div
      className={cardClasses}
      role="region"
      aria-labelledby={title ? 'card-title' : undefined}
      data-testid={dataTestid}
    >
      {renderMedia()}
      <div className={`gi-card-content gi-card-inset-${inset}`}>
        <div className="gi-card-header">
          <div className="gi-card-heading">
            {renderTitle()}
            {subTitle && (
              <div
                className="gi-card-subheading"
                aria-label={`Subtitle: ${subTitle}`}
              >
                {subTitle}
              </div>
            )}
          </div>
          {tag?.text && tag.type && (
            <div className="gi-card-tag" aria-label={`Tag: ${tag.text}`}>
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
