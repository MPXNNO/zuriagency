"use client";

export default function ContactLink({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        // @ts-expect-error global helper posé par ContactModal
        window.openContact?.();
      }}
    >
      {children}
    </a>
  );
}
