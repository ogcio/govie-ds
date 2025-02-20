export const Pages = {
  Basic: 'basic-page.html',
  Search: 'search-page.html',
  Layout: 'layout-page.html',
} as const;

type PagesType = (typeof Pages)[keyof typeof Pages];

type renderPage = {
  size: 'lg' | 'md' | 'sm';
  page?: PagesType;
};

export function RenderPage({ size, page = Pages.Basic }: renderPage) {
  const widthClass = (() => {
    switch (size) {
      case 'sm': {
        return 'w-[414px]';
      }
      case 'md': {
        return 'w-[768px]';
      }
      default: {
        return 'w-full';
      }
    }
  })();

  return (
    <iframe
      style={{
        zoom: 0.9,
      }}
      src={`/templates/${page}`}
      className={`h-[50vh] ${widthClass} border-solid border-gray-300 border overflow-hidden`}
    ></iframe>
  );
}
