export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="flex justify-center text-center text-lg text-gray-500 italic">
      <p className="w-[600px] text-blue-300">{children}</p>
    </blockquote>
  );
}
