export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs uppercase tracking-[0.3em] text-structure">
      {children}
    </p>
  );
}
