import React from "react";
import { LucideIcon } from "lucide-react";

interface AppleIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  weight?: "light" | "regular" | "semibold" | "bold";
}

export const AppleIcon = ({ 
  icon: Icon, 
  size = 24, 
  className = "", 
  weight = "regular" 
}: AppleIconProps) => {
  // Map weight to strokeWidth
  const strokeWidthMap = {
    light: 1,
    regular: 1.5,
    semibold: 2,
    bold: 2.5
  };

  return (
    <Icon 
      size={size} 
      strokeWidth={strokeWidthMap[weight]} 
      className={`sf-symbol ${className}`}
      style={{ 
        // Apple's SF Symbols often have a slightly different optical alignment
        display: "inline-block",
        verticalAlign: "middle"
      }}
    />
  );
};
