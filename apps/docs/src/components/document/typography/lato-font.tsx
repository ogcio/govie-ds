'use client';

export function LatoFont({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'Lato, Arial, sans-serif',
      }}
    >
      {children}
    </div>
  );
}
