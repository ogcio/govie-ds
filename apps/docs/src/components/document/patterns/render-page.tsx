import { config } from '@/lib/config';

export enum Pages {
  BASIC = 'basic-page.html',
  SEARCH = 'search-page.html',
}

type renderPage = {
  size: 'lg' | 'md' | 'sm';
  page?: Pages;
};

export function RenderPage({ size, page = Pages.BASIC }: renderPage) {
  const isDevelopment = config.isGitHubPages();

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
      src={isDevelopment ? `/govie-ds/templates/${page}` : `/templates/${page}`}
      className={`h-[50vh] ${widthClass} border-solid border-gray-300 border overflow-hidden`}
    ></iframe>
  );
}
