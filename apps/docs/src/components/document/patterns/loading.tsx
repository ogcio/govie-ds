import { Paragraph, Spinner } from '@govie-ds/react';

const LoadingComponent = ({
  label = 'We’re logging you out',
  size = 'xl',
}: {
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  return (
    <div className="gi-flex gi-flex-col gi-items-center gi-justify-center gi-gap-2 gi-py-8">
      <Spinner size={size} />
      {label && (
        <Paragraph className="font-bold" as="span">
          {label}
        </Paragraph>
      )}
    </div>
  );
};

export function LoadingPattern() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <LoadingComponent />
        <Paragraph as="span">
          Please don&rsquo;t close or refresh this page — you&rsquo;ll be
          redirected shortly.
        </Paragraph>
      </div>
    </>
  );
}
