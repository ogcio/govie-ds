export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`
        gi-mx-auto 
        gi-w-full 
        gi-h-full 
        gi-py-0 
        gi-px-[16px] 
        gi-max-w-[var(--gieds-screen-xs)] 
        sm:gi-px-[16px] 
        sm:gi-max-w-[var(--gieds-screen-sm)]
        md:gi-px-[32px] 
        md:gi-max-w-[var(--gieds-screen-md)]
        lg:gi-px-[64px] 
        lg:gi-max-w-[var(--gieds-screen-lg)]
        xl:gi-px-[96px] 
        xl:gi-max-w-[var(--gieds-screen-xl)]
        2xl:gi-px-[128px] 
        2xl:gi-max-w-[var(--gieds-screen-2xl)]
        `}
    >
      {children}
    </div>
  );
}
