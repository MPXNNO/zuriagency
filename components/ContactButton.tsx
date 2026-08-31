"use client";

export default function ContactButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        // @ts-expect-error global helper posé par ContactModal
        window.openContact?.();
      }}
    >
      {children}
    </button>
  );
}
