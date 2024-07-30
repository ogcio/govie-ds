import { Fragment } from 'react';
import { Text } from '@/components/typography/text';

const benefits = [
  {
    title: 'Consistency',
    description: 'Consistent design and behavior across all applications',
  },
  {
    title: 'Quality',
    description: 'Improves quality and reduces bugs',
  },
  {
    title: 'Efficiency',
    description: 'Reduces design and development time',
  },
];

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Fragment>
      <dt>
        <Text as="h3" className="mt-0 mb-0">
          {title}
        </Text>
      </dt>
      <dd>{description}</dd>
    </Fragment>
  );
}

export function DesignSystemBenefits() {
  return (
    <dl className="flex flex-col gap-md bg-gray-50 px-xl py-lg rounded">
      {benefits.map((benefit) => {
        return (
          <Fragment key={benefit.title}>
            <Benefit title={benefit.title} description={benefit.description} />
          </Fragment>
        );
      })}
    </dl>
  );
}
