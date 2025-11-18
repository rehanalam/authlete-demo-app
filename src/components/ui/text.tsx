import React, { JSX } from "react";
import clsx from "clsx";

type TextVariant = "sm" | "md" | "lg";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "p" | "span";
  variant?: TextVariant;
  fontWeight?: "normal" | "medium" | "bold";
  color?: string;
  className?: string;
}

function Text({
  children,
  as = "p",
  variant = "md",
  fontWeight = "normal",
  color = "text-gray-900",
  className,
}: TextProps) {
  const variantClasses: Record<TextVariant, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const weightClasses: Record<typeof fontWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  const classes = clsx(variantClasses[variant], weightClasses[fontWeight], color, className);
  const Tag = as as keyof JSX.IntrinsicElements;
  return <Tag className={classes}>{children}</Tag>;
}
export { Text };
