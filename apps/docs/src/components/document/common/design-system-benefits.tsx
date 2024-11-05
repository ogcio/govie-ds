import { Heading } from '@govie-ds/react';
import { Fragment } from 'react';

const benefits = [
  {
    title: 'Consistency',
    description: 'Consistent design and behaviour across all applications',
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
        <Heading as="h3">{title}</Heading>
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
