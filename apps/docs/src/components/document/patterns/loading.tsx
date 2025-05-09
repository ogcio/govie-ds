import {
  Header,
  Paragraph,
  Footer,
  HeaderSearch,
  Spinner,
} from '@govie-ds/react';

const LoadingComponent = ({
  label = 'Loading...',
  size = 'xl',
}: {
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  return (
    <div className="gi-flex gi-flex-col gi-items-center gi-justify-center gi-gap-2 gi-py-8">
      <Spinner size={size} />
      {label && <Paragraph>{label}</Paragraph>}
    </div>
  );
};

export function LoadingPattern() {
  return (
    <>
      <Header
        logo={{ href: '/' }}
        items={[
          {
            itemType: 'slot',
            component: <HeaderSearch />,
            slotAppearance: 'dropdown',
          },
        ]}
      />
      <main className="gi-flex gi-flex-col gi-items-center gi-justify-center gi-min-h-[50vh] gi-text-center gi-gap-4 gi-px-4">
        <Paragraph>
          We&rsquo;re preparing your content. Please wait a moment.
        </Paragraph>
        <LoadingComponent />
      </main>
      <Footer />
    </>
  );
}
