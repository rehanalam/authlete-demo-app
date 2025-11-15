import React from "react";
import clsx from "clsx";
import { JSX } from "react/jsx-runtime";

type HeadingVariant = "sm" | "md" | "lg";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: HeadingLevel; // h1–h6
  variant?: HeadingVariant; // font size variant
  fontWeight?: "normal" | "medium" | "bold";
  className?: string;
  color?: string; // Tailwind text color
}

function Title({
  children,
  level = 2,
  variant = "md",
  fontWeight = "bold",
  color = "text-gray-900",
  className,
}: TitleProps) {
  const variantClasses: Record<HeadingVariant, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const weightClasses: Record<typeof fontWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  const classes = clsx(variantClasses[variant], weightClasses[fontWeight], color, className);

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={classes}>{children}</Tag>;
}
export { Title };
