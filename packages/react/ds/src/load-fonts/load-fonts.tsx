/**
 * LoadFonts Component
 *
 * This component injects Google Fonts link tags for Lato font family and Material Symbols Outlined icons.
 * Use this component in your app's root layout or _app file to load fonts from Google CDN.
 *
 * **Next.js App Router (app/layout.tsx):**
 * ```tsx
 * import { LoadFonts } from '@ogcio/design-system-react';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <head>
 *         <LoadFonts />
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
 * import { LoadFonts } from '@ogcio/design-system-react';
 *
 * export default function App({ Component, pageProps }) {
 *   return (
 *     <>
 *       <Head>
 *         <LoadFonts />
 *       </Head>
 *       <Component {...pageProps} />
 *     </>
 *   );
 * }
 * ```
 */
export const LoadFonts = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0..1,0&icon_names=accessibility_new,add_circle,apps,arrow_back,arrow_downward,arrow_drop_down,arrow_drop_up,arrow_forward,arrow_left_alt,arrow_outward,arrow_right_alt,arrow_upward,attach_file,block,call,cancel,candlestick_chart,chat_bubble,check,check_circle,chevron_left,chevron_right,child_care,close,content_copy,credit_card,delete,directions_car,do_not_disturb_on,download,edit,error,event,filter_list,first_page,health_and_safety,home,info,keyboard_arrow_down,keyboard_arrow_up,last_page,link,location_on,login,logout,mail,menu,mic,more_horiz,more_vert,open_in_new,person,person_cancel,person_check,refresh,search,send,settings,sort,space_dashboard,swap_vert,sync,thumb_down,thumb_up,unfold_more,upload,visibility,visibility_off,warning,work"
        rel="stylesheet"
      />
    </>
  );
};
