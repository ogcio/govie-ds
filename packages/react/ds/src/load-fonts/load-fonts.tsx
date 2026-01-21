/**
 * LoadMaterialSymbols Component
 *
 * This component injects Google Fonts link tags for Material Symbols Outlined icons.
 * Use this component in your app's root layout or _app file to load Material Symbols icons from Google CDN.
 *
 * **IMPORTANT: Font Loading**
 * This component does NOT load the Lato font family. For Next.js applications, use `next/font/google`
 * to load fonts optimally. See the design system documentation for font loading examples.
 *
 * **Next.js App Router (app/layout.tsx):**
 * ```tsx
 * import { LoadMaterialSymbols } from '@ogcio/design-system-react';
 * import { Lato } from 'next/font/google';
 *
 * const lato = Lato({
 *   subsets: ['latin'],
 *   weight: ['100', '300', '400', '700', '900'],
 *   style: ['normal', 'italic'],
 *   display: 'swap',
 * });
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" className={lato.className}>
 *       <head>
 *         <LoadMaterialSymbols />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 *
 * **Next.js Pages Router (pages/_app.tsx):**
 * ```tsx
 * import Head from 'next/head';
 * import { LoadMaterialSymbols } from '@ogcio/design-system-react';
 * import { Lato } from 'next/font/google';
 *
 * const lato = Lato({
 *   subsets: ['latin'],
 *   weight: ['100', '300', '400', '700', '900'],
 *   style: ['normal', 'italic'],
 *   display: 'swap',
 * });
 *
 * export default function App({ Component, pageProps }) {
 *   return (
 *     <div className={lato.className}>
 *       <Head>
 *         <LoadMaterialSymbols />
 *       </Head>
 *       <Component {...pageProps} />
 *     </div>
 *   );
 * }
 * ```
 */
export const LoadMaterialSymbols = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0..1,0&icon_names=accessibility_new,add_circle,apps,arrow_back,arrow_downward,arrow_drop_down,arrow_drop_up,arrow_forward,arrow_left_alt,arrow_outward,arrow_right_alt,arrow_upward,attach_file,block,call,cancel,candlestick_chart,chat_bubble,check,check_circle,chevron_left,chevron_right,child_care,close,content_copy,credit_card,delete,directions_car,do_not_disturb_on,download,edit,error,event,filter_list,first_page,health_and_safety,home,info,keyboard_arrow_down,keyboard_arrow_up,last_page,link,location_on,login,logout,mail,menu,mic,more_horiz,more_vert,open_in_new,person,person_cancel,person_check,refresh,search,send,settings,sort,space_dashboard,swap_vert,sync,thumb_down,thumb_up,unfold_more,upload,visibility,visibility_off,warning,work"
        rel="stylesheet"
      />
    </>
  );
};

/**
 * @deprecated Use {@link LoadMaterialSymbols} instead.
 *
 * This alias is kept for backward compatibility but has been renamed to
 * `LoadMaterialSymbols` for clarity. Note that this component no longer
 * loads the Lato font family; it only injects Google Fonts link tags for
 * Material Symbols icons. Load the Lato font separately (for example, using
 * `next/font/google`) as shown in the design system documentation.
 *
 */
export const LoadFonts = LoadMaterialSymbols;
