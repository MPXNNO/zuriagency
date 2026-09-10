"use client";

export default function ContactButton({
  className,
  mode,
  children,
}: {
  className?: string;
  mode?: "contact" | "candidature";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        // @ts-expect-error global helper posé par ContactModal
        window.openContact?.(mode);
      }}
    >
      {children}
    </button>
  );
}
