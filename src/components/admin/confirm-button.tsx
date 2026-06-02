"use client";

/** Submit button that asks for confirmation first (PHP onsubmit=confirm). */
export function ConfirmButton({
  message,
  className,
  name,
  value,
  children,
}: {
  message: string;
  className?: string;
  name?: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      name={name}
      value={value}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
