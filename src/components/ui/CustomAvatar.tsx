
import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const CustomAvatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeStyles = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback.charAt(0).toUpperCase();
    if (alt) {
      const parts = alt.split(" ");
      if (parts.length > 1) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      return alt.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-secondary",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium text-secondary-foreground">
          {getFallbackInitials()}
        </span>
      )}
    </div>
  );
};

export default CustomAvatar;
