/**
 * LoadMaterialSymbols Component
 *
 * This component is a workaround solution, responsible for loading the Material Symbols font from Google Fonts specifically for Next 16 users.
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

export default LoadMaterialSymbols;
