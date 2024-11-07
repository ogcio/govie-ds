import { Button, Heading, Paragraph, Spinner } from '@govie-ds/react';

export const modalProps = {
  children: (
    <>
      <Heading as="h2">Title</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
        magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
        doloribus asperiores
      </Paragraph>
      <div className="gi-flex gi-gap-6 gi-justify-end">
        <Button variant="secondary" appearance="dark">
          Cancel action
        </Button>
        <Button>Primary action</Button>
      </div>
    </>
  ),
  triggerButton: <Button>Open Modal</Button>,
};

export const modalSpinnerProps = {
  children: (
    <>
      <div className="grid gap-4 px-4 justify-items-center">
        <Spinner size="xl" />
        <span>Loading...</span>
      </div>
    </>
  ),
  triggerButton: <Button>Open Modal</Button>,
};
