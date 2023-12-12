import clsx from "clsx";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Heading({ children, className }: TypographyProps) {
  return (
    <h2 className={clsx("text-heading text-gray-900", className)}>
      {children}
    </h2>
  );
}

export function Subheading({ children, className }: TypographyProps) {
  return (
    <h3
      className={clsx("text-subheading font-normal text-gray-900", className)}
    >
      {children}
    </h3>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p className={clsx("text-base font-normal text-gray-500", className)}>
      {children}
    </p>
  );
}
