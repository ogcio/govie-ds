'use client';
import {
  Children,
  Context,
  createContext,
  FC,
  isValidElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag, TagProps } from '../tag/tag.js';
import {
  CardDescriptionProps,
  CardContainerProps,
  CardActionProps,
  CardHeaderProps,
  CardMediaProps,
  CardNextProps,
  CardSubtitleProps,
  CardTitleProps,
} from './types.js';

const CardNextContext = createContext(false);
const CardHeaderContext = createContext(false);
const CardContainerContext = createContext(false);

export function useRequiredContext(
  context: Context<boolean>,
  componentName: string,
  parentName: string,
): true {
  const inside = useContext(context);
  if (!inside) {
    throw new Error(`${componentName} must be used inside <${parentName}>`);
  }
  return true;
}

export const CardNext: FC<CardNextProps> = ({
  children,
  inset,
  type = 'vertical',
  dataTestid,
}) => {
  const cardClasses = useMemo(() => {
    const insetClass = `gi-card-inset-${inset || 'none'}`;
    return `gi-card gi-card-${type} ${insetClass}`;
  }, [type, inset]);

  return (
    <CardNextContext.Provider value={true}>
      <div className={cardClasses} data-testid={dataTestid}>
        {children}
      </div>
    </CardNextContext.Provider>
  );
};

export const CardMedia: FC<CardMediaProps> = ({ media, href }) => {
  useRequiredContext(CardNextContext, 'CardMedia', 'Card');

  if (!media) {
    return null;
  }

  switch (media.type) {
    case 'image': {
      const { src, alt, aspectRatio } = media.config;
      return (
        <div className="gi-card-image">
          <a href={href}>
            <img
              src={src}
              alt={alt}
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

export const CardContainer: FC<CardContainerProps> = ({
  children,
  inset = 'none',
}) => {
  useRequiredContext(CardNextContext, 'CardContainer', 'Card');
  return (
    <CardContainerContext.Provider value={true}>
      <div className={`gi-card-content gi-card-inset-${inset || 'none'}`}>
        {children}
      </div>
    </CardContainerContext.Provider>
  );
};

export const CardTitle: FC<CardTitleProps> = ({ children }) => {
  useRequiredContext(CardHeaderContext, 'CardTitle', 'CardHeader');
  if (!children) {
    return null;
  }
  return <div className="gi-card-title">{children}</div>;
};

export const CardSubtitle: FC<CardSubtitleProps> = ({ children }) => {
  useRequiredContext(CardHeaderContext, 'CardSubtitle', 'CardHeader');
  if (!children) {
    return null;
  }

  return <div className="gi-card-subheading">{children}</div>;
};

export const CardTag: FC<TagProps> = ({ text, type }: TagProps) => {
  useRequiredContext(CardHeaderContext, 'CardTag', 'CardHeader');
  return (
    <div className="gi-card-tag">
      <Tag text={text} type={type} />
    </div>
  );
};
// Not necessary to expose componentType as props, internal use only.
Object.defineProperty(CardTag, 'componentType', {
  value: 'CardTag',
  writable: false,
  enumerable: false,
});

export const CardHeader: FC<CardHeaderProps> = ({ children }) => {
  useRequiredContext(CardContainerContext, 'CardHeader', 'CardContainer');

  const headingChildren: ReactNode[] = [];
  const tags: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const type =
      (child?.type as any)?.componentType || (child.props as any)?.__mdxType;

    if (type === 'CardTag') {
      tags.push(child);
    } else {
      headingChildren.push(child);
    }
  });

  return (
    <CardHeaderContext.Provider value={true}>
      <div className="gi-card-header">
        <div className="gi-card-heading">{headingChildren}</div>
        {tags}
      </div>
    </CardHeaderContext.Provider>
  );
};

export const CardDescription: FC<CardDescriptionProps> = ({
  children,
}: CardDescriptionProps) => {
  useRequiredContext(CardContainerContext, 'CardDescription', 'CardContainer');
  if (!children) {
    return null;
  }

  return (
    <div className="gi-card-paragraph">
      <Paragraph size="sm">{children}</Paragraph>
    </div>
  );
};

export const CardAction: FC<CardActionProps> = ({
  children,
}: CardActionProps) => {
  useRequiredContext(CardContainerContext, 'CardAction', 'CardContainer');
  return <div className="gi-card-action">{children}</div>;
};
