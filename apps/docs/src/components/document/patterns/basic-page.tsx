export function BasicPage({ size }: { size: 'lg' | 'md' | 'sm' }) {
  const widthClass = (() => {
    switch (size) {
      case 'sm': {
        return 'w-[414px]';
      }
      case 'md': {
        return 'w-[600px]';
      }
      default: {
        return 'w-full';
      }
    }
  })();
  return (
    <iframe
      src="/templates/search-page.html"
      className={`h-[50vh] ${widthClass} border-solid border-gray-300 border overflow-hidden`}
    ></iframe>
  );
}
