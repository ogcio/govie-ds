export function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className={`gi-my-6 gi-p-4 gi-border-l-2xl gi-border-gray-400 gi-text-sm md:gi-text-md`}
    >
      {children}
    </blockquote>
  );
}
