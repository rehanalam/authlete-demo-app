import React from "react";
import { LucideIcon } from "lucide-react";

interface IconWrapperProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon, size = 24, className }) => {
  return <Icon width={size} height={size} className={className} />;
};
