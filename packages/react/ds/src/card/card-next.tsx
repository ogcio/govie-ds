'use client';
import {
  Children,
  cloneElement,
  Context,
  createContext,
  FC,
  isValidElement,
  ReactNode,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { Breakpoint, useBreakpoint } from '../hooks/use-breakpoint.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag } from '../tag/tag.js';
import {
  getSpecialComponentType,
  isSpecialComponent,
} from '../utils/utilities.js';
import {
  CardDescriptionProps,
  CardContainerProps,
  CardActionProps,
  CardHeaderProps,
  CardMediaProps,
  CardNextProps,
  CardSubtitleProps,
  CardTitleProps,
  CardTagProps,
} from './types.js';

const CardNextContext = createContext(false);
const CardHeaderContext = createContext(false);
const CardContainerContext = createContext(false);
const CardA11yContext = createContext(null);

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
  inset = 'none',
  type = 'vertical',
  background = 'white',
  className,
  role,
  children,
  ...props
}) => {
  const { breakpoint } = useBreakpoint();
  const isMobile =
    breakpoint === Breakpoint.ExtraSmall || breakpoint === Breakpoint.Small;

  const allChildren = Children.toArray(children);
  const cardContainer = allChildren.find(
    (child) => getSpecialComponentType(child) === 'CardContainer',
  );
  const cardMedia = allChildren.find(
    (child) => getSpecialComponentType(child) === 'CardMedia',
  );

  const [labelId, setLabelId] = useState<string>();
  const [descIds, setDescIds] = useState<string[]>([]);
  const a11yValue: any = useMemo(
    () => ({
      setLabelId: (id: string) => setLabelId(id),
      addDescId: (id: string) =>
        setDescIds((previous) =>
          previous.includes(id) ? previous : [...previous, id],
        ),
      labelId,
      descIds,
    }),
    [labelId, descIds],
  );

  return (
    <CardNextContext.Provider value={true}>
      <CardA11yContext.Provider value={a11yValue}>
        <div
          className={cn(
            'gi-card gi-not-prose',
            {
              'gi-card-vertical': type === 'vertical' || isMobile,
              'gi-card-horizontal': type === 'horizontal' && !isMobile,
              'gi-bg-white': background === 'white',
              'gi-bg-color-surface-system-neutral-layer1':
                background === 'grey',
              'gi-p-4': inset === 'full',
            },
            className,
          )}
          role={role ?? 'article'}
          aria-labelledby={labelId}
          aria-describedby={descIds?.length ? descIds.join(' ') : undefined}
          {...props}
        >
          {cardMedia}
          {cardContainer
            ? cloneElement(cardContainer as any, {
                className: cn((cardContainer as any).props?.className, {
                  'gi-py-4 gi-pr-4':
                    inset === 'body' && type === 'horizontal' && !isMobile,
                  'gi-px-4 gi-pb-4':
                    inset === 'body' && (type === 'vertical' || isMobile),
                }),
              })
            : null}
        </div>
      </CardA11yContext.Provider>
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

Object.defineProperty(CardMedia, 'componentType', {
  value: 'CardMedia',
  writable: false,
  enumerable: false,
});

export const CardContainer: FC<CardContainerProps> = ({
  children,
  className,
  ...props
}) => {
  useRequiredContext(CardNextContext, 'CardContainer', 'Card');

  return (
    <CardContainerContext.Provider value={true}>
      <div className={cn('gi-card-content', className)} {...props}>
        {children}
      </div>
    </CardContainerContext.Provider>
  );
};

Object.defineProperty(CardContainer, 'componentType', {
  value: 'CardContainer',
  writable: false,
  enumerable: false,
});

export const CardTitle: FC<CardTitleProps> = ({
  children,
  className,
  wrapText,
  id,
  ['aria-level']: ariaLevel = 2,
  ...props
}) => {
  useRequiredContext(CardHeaderContext, 'CardTitle', 'CardHeader');
  const isStringChild = typeof children === 'string';
  const wrapOnWrapper = !!wrapText && isStringChild;

  const decorateChild = (node: ReactNode): ReactNode => {
    if (!wrapText) {
      return node;
    }
    if (isValidElement(node)) {
      return cloneElement(node as any, {
        className: cn((node as any).props?.className, 'gi-card-wrap-text'),
      });
    }
    return node;
  };

  const content =
    wrapText && !isStringChild
      ? Children.map(children as ReactNode, decorateChild)
      : children;

  const autoId = useId();
  const titleId = id ?? `card-title-${autoId}`;

  const a11y = useContext(CardA11yContext) as any;
  if (a11y) {
    a11y.setLabelId(titleId);
  }

  return (
    <div
      className={cn(
        'gi-card-title',
        {
          'gi-card-wrap-text': wrapOnWrapper,
        },
        className,
      )}
      id={titleId}
      role="heading"
      aria-level={ariaLevel}
      title={isStringChild ? (children as string) : undefined}
      {...props}
    >
      {content}
    </div>
  );
};

export const CardSubtitle: FC<CardSubtitleProps> = ({
  children,
  className,
  wrapText,
  id,
  ...props
}) => {
  useRequiredContext(CardHeaderContext, 'CardSubtitle', 'CardHeader');
  const raw = typeof children === 'string' ? children : undefined;

  const autoId = useId();
  const subtitleId = id ?? `card-subtitle-${autoId}`;

  const a11y = useContext(CardA11yContext) as any;
  if (a11y) {
    a11y.addDescId(subtitleId);
  }

  return (
    <div
      className={cn(
        'gi-card-subheading',
        {
          'gi-card-wrap-text': wrapText,
        },
        className,
      )}
      id={subtitleId}
      title={raw}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTag: FC<CardTagProps> = ({
  text,
  type,
  className,
  ...props
}: CardTagProps) => {
  useRequiredContext(CardHeaderContext, 'CardTag', 'CardHeader');
  return (
    <div
      role="note"
      aria-label={typeof text === 'string' ? text : undefined}
      className={cn('gi-card-tag', className)}
      {...props}
    >
      <Tag text={text} type={type} />
    </div>
  );
};

Object.defineProperty(CardTag, 'componentType', {
  value: 'CardTag',
  writable: false,
  enumerable: false,
});

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  useRequiredContext(CardContainerContext, 'CardHeader', 'CardContainer');

  const headingChildren: ReactNode[] = [];
  const tags: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (isSpecialComponent(child, ['CardTag'])) {
      tags.push(child);
    } else {
      headingChildren.push(child);
    }
  });

  return (
    <CardHeaderContext.Provider value={true}>
      <div className={cn('gi-card-header', className)} role="group" {...props}>
        <div className="gi-card-heading">{headingChildren}</div>
        {tags}
      </div>
    </CardHeaderContext.Provider>
  );
};

export const CardDescription: FC<CardDescriptionProps> = ({
  children,
  className,
  id,
  ...props
}: CardDescriptionProps) => {
  useRequiredContext(CardContainerContext, 'CardDescription', 'CardContainer');
  if (!children) {
    return null;
  }

  const autoId = useId();
  const descId = id ?? `card-desc-${autoId}`;

  const a11y = useContext(CardA11yContext) as any;
  if (a11y) {
    a11y.addDescId(descId);
  }

  return (
    <div className={cn('gi-card-paragraph', className)} id={descId} {...props}>
      <Paragraph size="sm">{children}</Paragraph>
    </div>
  );
};

export const CardAction: FC<CardActionProps> = ({
  children,
  className,
  ...props
}: CardActionProps) => {
  useRequiredContext(CardContainerContext, 'CardAction', 'CardContainer');
  return (
    <div
      className={cn('gi-card-action', className)}
      role="group" /* why: groups related interactive controls */
      {...props}
    >
      {children}
    </div>
  );
};
