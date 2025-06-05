import { Button } from '../button/button.js';
import { translate as t } from '../i18n/utility.js';
import { Link } from '../link/link.js';
import {
  CardFooter,
  CardContainer,
  CardBody,
  CardMedia,
  CardNext,
  CardHeader,
} from './card-next.js';
import { Action, CardProps } from './types.js';

export const CardLegacy = ({
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
  titleAsChild,
  children,
}: CardProps) => {
  const renderTitle = () => {
    const isTitleOnly = !title || (!href && !titleAsChild);
    return isTitleOnly ? (
      title
    ) : (
      <Link
        href={href}
        asChild={titleAsChild}
        aria-label={t('card.cardHeader', {
          title,
          defaultValue: `Card link: ${title}`,
        })}
      >
        {titleAsChild ? children : title}
      </Link>
    );
  };

  const renderAction = (action: Action) => {
    if (action.type === 'link') {
      return (
        <Link
          {...action}
          aria-label={t('card.actionLink', {
            children: action.children,
            defaultValue: `Action link: ${action.children}`,
          })}
        >
          {action.children}
        </Link>
      );
    }
    return (
      <Button
        {...action}
        aria-label={t('card.actionButton', {
          children: action.children,
          defaultValue: `Action button: ${action.children}`,
        })}
      >
        {action.children}
      </Button>
    );
  };

  return (
    <CardNext inset={inset} type={type} dataTestid={dataTestid}>
      {media && <CardMedia media={media} href={href} />}
      <CardContainer inset={inset}>
        <CardHeader subTitle={subTitle} tag={tag}>
          {renderTitle()}
        </CardHeader>
        <CardBody>{content}</CardBody>
        {action && <CardFooter>{renderAction(action)}</CardFooter>}
      </CardContainer>
    </CardNext>
  );
};

CardLegacy.displayName = 'CardLegacy';
