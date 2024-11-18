import { Button, Heading, Paragraph, PhaseBanner } from '@govie-ds/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import heroImage from '../../public/hero.png';
import { RightArrowIcon } from '@/components/icons/right-arrow-icon';
import { Prose } from '@/components/typography/prose';
import { config } from '@/lib/config';

const benefits = [
  {
    title: 'Efficiency',
    description:
      'Streamline your design processes with a comprehensive suite of components, patterns, and guidelines.',
  },
  {
    title: 'Consistency',
    description:
      'Ensure a cohesive user experience across your digital services with a unified design language.',
  },
  {
    title: 'Accessibility',
    description:
      'Meet WCAG 2.1 AA standards with accessible components and inclusive design principles.',
  },
  {
    title: 'Performance',
    description:
      'Deliver fast and responsive digital services with optimised components and assets.',
  },
  {
    title: 'Responsive',
    description:
      'Create digital services that work across all devices and screen sizes with responsive features and layouts.',
  },
  {
    title: 'Compliance',
    description:
      'Ensure compliance with government standards and regulations with the Design System Building Block.',
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
    <li className="border-gray-50 border-sm rounded p-xl">
      <Heading as="h3">{title}</Heading>
      <Paragraph>{description}</Paragraph>
    </li>
  );
}

function Benefits() {
  return (
    <div className="flex flex-col gap-4xl items-center">
      <Heading as="h2">
        The Design System Building Block offers a wide range of benefits to both
        users and departments
      </Heading>
      <ul className="grid grid-cols-1 gap-2xl sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ title, description }) => (
          <Fragment key={title}>
            <Benefit title={title} description={description} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  return (
    <article className="gi-layout-container flex flex-col sm:pb-2xl gap-5xl grow">
      <PhaseBanner level="alpha">
        <p className="text-gray-700 text-xs sm:text-md">
          This is a new service - your{' '}
          <a
            className="underline text-blue-700 hover:decoration-md"
            href={config.feedbackFormUrl}
          >
            feedback
          </a>{' '}
          will help us to improve it.
        </p>
      </PhaseBanner>
      <section className="flex flex-wrap lg:flex-nowrap gap-2xl">
        <Prose>
          <h1 className="leading-none sm:leading-normal">Design System</h1>
          <p>
            The Design System Building Block ensures efficiency, quality and
            consistency across public sector departments. Engineered to be
            responsive, compliant with accessibility regulations and
            customisable, the Design System Building Block allows departments to
            create cohesive digital experiences effortlessly.
          </p>
          <Button onClick={() => router.push(config.signUpFormUrl)}>
            Sign up to learn more <RightArrowIcon />
          </Button>
        </Prose>
        <div>
          <Image
            src={heroImage}
            alt="Design system"
            style={{ minWidth: '360px', width: '100%', height: 'auto' }}
            priority
          />
        </div>
      </section>
      <Benefits />
      <Prose as="section">
        <Heading as="h2">Get started</Heading>
        <Paragraph>
          Ready to elevate your design processes? Contact us to schedule a demo
          or learn more about how the Design System Building Block can benefit
          your department.
        </Paragraph>
        <Button onClick={() => router.push(config.signUpFormUrl)}>
          Sign up to learn more <RightArrowIcon />
        </Button>
      </Prose>
    </article>
  );
}
