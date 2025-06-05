'use client';
import { createContext, useContext, useMemo } from 'react';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Tag } from '../tag/tag.js';
import {
  CardBodyProps,
  CardContainerProps,
  CardFooterProps,
  CardHeaderProps,
  CardMediaProps,
  CardNextProps,
} from './types.js';

export const CardNextContext = createContext(false);
export const CardContainerContext = createContext(false);

export const useCardNext = (componentName: string) => {
  const isInCard = useContext(CardNextContext);
  if (!isInCard) {
    throw new Error(`${componentName} must be used inside <Card>`);
  }
  return true;
};

export const useCardContainer = (componentName: string) => {
  const inside = useContext(CardContainerContext);
  if (!inside) {
    throw new Error(`${componentName} must be used inside <CardContainer>`);
  }
  return true;
};

export function CardNext({
  children,
  inset,
  type = 'vertical',
  dataTestid,
}: CardNextProps) {
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
}

export function CardMedia({ media, href }: CardMediaProps) {
  useCardNext('CardMedia');

  if (!media) {
    return null;
  }

  switch (media.type) {
    case 'image': {
      const { src, alt, aspectRatio } = media.config;
      return (
        <div className="gi-card-image" aria-label={alt}>
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
}

export function CardContainer({
  children,
  inset = 'none',
}: CardContainerProps) {
  useCardNext('CardContainer');
  return (
    <CardContainerContext.Provider value={true}>
      <div className={`gi-card-content gi-card-inset-${inset || 'none'}`}>
        {children}
      </div>
    </CardContainerContext.Provider>
  );
}

export function CardHeader({ children, subTitle, tag }: CardHeaderProps) {
  useCardContainer('CardHeader');
  return (
    <div className="gi-card-header">
      <div className="gi-card-heading">
        <div className="gi-card-title">{children}</div>
        {subTitle && <div className="gi-card-subheading">{subTitle}</div>}
      </div>
      {tag?.text && tag.type && (
        <div className="gi-card-tag">
          <Tag text={tag.text} type={tag.type} />
        </div>
      )}
    </div>
  );
}

export function CardBody({ children }: CardBodyProps) {
  useCardContainer('CardBody');
  if (!children) {
    return null;
  }

  return (
    <div className="gi-card-paragraph">
      <Paragraph size="sm">{children}</Paragraph>
    </div>
  );
}

export function CardFooter({ children }: CardFooterProps) {
  useCardContainer('CardFooter');
  return <div className="gi-card-action">{children}</div>;
}
