import { Fragment } from "react";
import Image from "next/image";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/form/button";
import heroImage from "../../public/hero.png";
import { config } from "@/lib/config";

function Prose({
  as: As = "div",
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <As className={`prose md:prose-lg lg:prose-xl ${className}`}>{children}</As>
  );
}

const benefits = [
  {
    title: "Efficiency",
    description:
      "Streamline your design processes with a comprehensive suite of components, patterns, and guidelines.",
  },
  {
    title: "Consistency",
    description:
      "Ensure a cohesive user experience across your digital services with a unified design language.",
  },
  {
    title: "Accessibility",
    description:
      "Meet WCAG 2.1 AA standards with accessible components and inclusive design principles.",
  },
  {
    title: "Performance",
    description:
      "Deliver fast and responsive digital services with lightweight components and optimised assets.",
  },
  {
    title: "Responsive",
    description:
      "Create digital services that work across all devices and screen sizes with responsive components and layouts.",
  },
  {
    title: "Compliance",
    description:
      "Ensure compliance with government standards and regulations with the Design System building block.",
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
    <li className="flex flex-col gap-lg border-gray-50 border-sm rounded p-xl">
      <Heading as="h3">{title}</Heading>
      <Text className="text-gray-700">{description}</Text>
    </li>
  );
}

function Benefits() {
  return (
    <div className="flex flex-col gap-4xl items-center">
      <Prose className="text-center">
        <Text className="text-xl font-semibold lg:px-6xl">
          The Design System building block offers a range of benefits to public
          sector departments
        </Text>
      </Prose>
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

function Feedback() {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center gap-lg">
        <div className="bg-blue-600 px-md rounded text-white tracking-wider">
          Alpha
        </div>
        <p className="text-gray-700 text-xs sm:text-md">
          This is a new service - your{" "}
          <a
            className="underline text-blue-700 hover:decoration-md"
            href={config.feedbackFormUrl}
          >
            feedback
          </a>{" "}
          will help us to improve it.
        </p>
      </div>
      <hr />
    </div>
  );
}

export default function HomePage() {
  return (
    <article className="flex flex-col sm:pb-2xl gap-5xl grow">
      <Feedback />
      <section className="flex flex-wrap lg:flex-nowrap gap-2xl">
        <Prose>
          <Heading as="h1" className="leading-none sm:leading-normal">
            Design System
          </Heading>
          <Text>
            The Design System building block enhances efficiency, quality, and
            consistency across public sector departments, offering a
            comprehensive design system solution. Engineered to be responsive,
            compliant with accessibility regulations, and highly flexible, the
            Design System Building Block empowers your department to create
            cohesive digital experiences effortlessly.
          </Text>
          <Button href={config.signUpFormUrl}>Learn more</Button>
        </Prose>
        <div>
          <Image
            src={heroImage}
            alt="Design system"
            style={{ minWidth: "360px", width: "100%", height: "auto" }}
            priority
          />
        </div>
      </section>
      <Benefits />
      <Prose as="section">
        <Heading as="h2">Get started</Heading>
        <Text>
          Ready to elevate your design processes? Contact us to schedule a demo
          or learn more about how the Design System building block can empower
          your public sector department.
        </Text>
        <Button href={config.signUpFormUrl}>Get started</Button>
      </Prose>
    </article>
  );
}
