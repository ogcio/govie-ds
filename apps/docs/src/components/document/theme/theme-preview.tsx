import { resolveCssVariables } from '@/lib/theme-utils';
import { Alert, Button, Header, Paragraph, Tag } from '@govie-ds/react';
import React from 'react';

type ThemePreviewProps = {
  colors: Record<string, Record<string | number, string>>;
};

export const ThemePreview: React.FC<ThemePreviewProps> = ({ colors }) => {
  return (
    <div
      style={resolveCssVariables(colors)}
      className="p-4 border rounded shadow"
    >
      <div className="flex flex-col gap-8">
        <Header
          title="Example"
          items={[
            {
              itemType: 'link',
              label: 'Link 1',
            },
            {
              itemType: 'link',
              label: 'Link 2',
            },
            {
              itemType: 'link',
              label: 'Link 3',
            },
          ]}
        />
        <div className="flex gap-4">
          <Button className="w-fit" variant="primary">
            Primary
          </Button>
          <Button className="w-fit" variant="secondary">
            Secondary
          </Button>
          <Button className="w-fit" variant="flat">
            Flat
          </Button>
        </div>
        <div className="flex gap-4">
          <Tag type="info" text="Info" />
          <Tag type="success" text="Success" />
          <Tag type="warning" text="Warning" />
          <Tag type="error" text="Error" />
        </div>
        <div className="flex gap-4">
          <Alert title="Info">
            <Paragraph>This is a info Alert</Paragraph>
          </Alert>
          <Alert title="Success" variant="success">
            <Paragraph>This is a success Alert</Paragraph>
          </Alert>
          <Alert title="Warning" variant="warning">
            <Paragraph>This is a warning Alert</Paragraph>
          </Alert>
          <Alert title="Error" variant="danger">
            <Paragraph>This is an error Alert</Paragraph>
          </Alert>
        </div>
      </div>
    </div>
  );
};
