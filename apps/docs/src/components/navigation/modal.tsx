import { Button, Heading, Paragraph } from '@govie-ds/react';

export const modalProps = {
  children: (
    <>
      <Heading>Title</Heading>
      <Paragraph>
        {' '}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
        magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
        doloribus asperiores
      </Paragraph>
      <div className="gi-flex gi-gap-3 gi-justify-between">
        <Button>Primary action</Button>
        <Button variant="secondary">Cancel action</Button>
      </div>
    </>
  ),
  triggerButton: <Button>Open Modal</Button>,
};
