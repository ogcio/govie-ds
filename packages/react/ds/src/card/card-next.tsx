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
  useEffect,
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

const computeMediaLabel = (config: any) =>
  config.ariaLabel ?? config.label ?? config.title ?? config.alt ?? '';

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

const rootInsetStyle = (inset: 'none' | 'body' | 'full', px: number) =>
  inset === 'full' ? { padding: px } : {};

const contentInsetStyle = (
  inset: 'none' | 'body' | 'full',
  px: number,
  orientation: 'horizontal' | 'vertical',
) => {
  if (inset !== 'body') {
    return;
  }

  return orientation === 'horizontal'
    ? { paddingBlock: px, paddingRight: px }
    : { paddingInline: px, paddingBottom: px };
};

export const CardNext: FC<CardNextProps> = ({
  inset = 'none',
  insetSpace = 16,
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
  const [orientation, setOrientation] = useState(type);
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

  const allChildren = Children.toArray(children);
  const cardContainer = allChildren.find(
    (child) => getSpecialComponentType(child) === 'CardContainer',
  );
  const cardMedia = allChildren.find(
    (child) => getSpecialComponentType(child) === 'CardMedia',
  );

  useEffect(() => {
    if (isMobile || type === 'vertical') {
      setOrientation('vertical');
      return;
    }

    setOrientation('horizontal');
  }, [isMobile, type]);

  return (
    <CardNextContext.Provider value={true}>
      <CardA11yContext.Provider value={a11yValue}>
        <div
          className={cn(
            'gi-card gi-not-prose',
            {
              'gi-card-vertical': orientation === 'vertical',
              'gi-card-horizontal': orientation === 'horizontal',
              'gi-bg-white': background === 'white',
              'gi-bg-color-surface-system-neutral-layer1':
                background === 'grey',
            },
            className,
          )}
          style={rootInsetStyle(inset, insetSpace)}
          role={role ?? 'article'}
          aria-labelledby={labelId}
          aria-describedby={descIds?.length ? descIds.join(' ') : undefined}
          {...props}
        >
          {cardMedia}
          {cardContainer
            ? cloneElement(cardContainer as any, {
                className: cn((cardContainer as any).props?.className),
                style: {
                  ...(cardContainer as any).props?.style,
                  ...contentInsetStyle(inset, insetSpace, orientation),
                },
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
      const { src, alt, aspectRatio } = media.config ?? {};
      const label = computeMediaLabel(media.config);

      return (
        <div className="gi-card-image">
          <a href={href} aria-label={label} title={label}>
            <img
              src={src}
              alt={alt ?? ''}
              style={aspectRatio ? { aspectRatio } : undefined}
              className={aspectRatio ? 'gi-w-full' : undefined}
            />
          </a>
        </div>
      );
    }
    case 'icon': {
      const label = computeMediaLabel(media.config);
      return (
        <div className="gi-card-icon">
          <a href={href} aria-label={label} title={label}>
            <Icon {...media.config} aria-hidden="true" />
          </a>
        </div>
      );
    }
    case 'iframe': {
      const { title } = media.config ?? 'Embedded content';

      return (
        <div className="gi-card-iframe">
          <iframe {...media.config} title={title} />
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
  truncate,
  id,
  ['aria-level']: ariaLevel = 2,
  ...props
}) => {
  useRequiredContext(CardHeaderContext, 'CardTitle', 'CardHeader');
  const isStringChild = typeof children === 'string';

  const decorateChild = (node: ReactNode): ReactNode => {
    if (!truncate) {
      return node;
    }
    if (isValidElement(node)) {
      return cloneElement(node as any, {
        className: cn((node as any).props?.className, 'gi-card-truncate-text'),
      });
    }
    return node;
  };

  const content =
    truncate && !isStringChild
      ? Children.map(children as ReactNode, decorateChild)
      : children;

  const autoId = useId();
  const titleId = id ?? `card-title-${autoId}`;

  const a11y = useContext(CardA11yContext) as any;

  useEffect(() => {
    if (!a11y) {
      return;
    }
    a11y.setLabelId(titleId);
  }, [a11y, titleId]);

  return (
    <div
      className={cn(
        'gi-card-title',
        {
          'gi-card-truncate-text': !!truncate && isStringChild,
        },
        className,
      )}
      id={titleId}
      role="heading"
      aria-level={ariaLevel}
      title={isStringChild && truncate ? children.toString() : undefined}
      {...props}
    >
      {content}
    </div>
  );
};

export const CardSubtitle: FC<CardSubtitleProps> = ({
  children,
  className,
  truncate,
  id,
  ...props
}) => {
  useRequiredContext(CardHeaderContext, 'CardSubtitle', 'CardHeader');
  const raw = typeof children === 'string' && truncate ? children : undefined;

  const autoId = useId();
  const subtitleId = id ?? `card-subtitle-${autoId}`;

  const a11y = useContext(CardA11yContext) as any;

  useEffect(() => {
    if (!a11y) {
      return;
    }
    a11y.addDescId(subtitleId);
  }, [a11y, subtitleId]);

  return (
    <div
      className={cn(
        'gi-card-subheading',
        {
          'gi-card-truncate-text': truncate,
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

  useEffect(() => {
    if (!a11y) {
      return;
    }
    a11y.addDescId(descId);
  }, [a11y, descId]);

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
    <div className={cn('gi-card-action', className)} role="group" {...props}>
      {children}
    </div>
  );
};
