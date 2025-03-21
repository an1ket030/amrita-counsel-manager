
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline" | "gradient";
  children: React.ReactNode;
  className?: string;
}

const CustomCard: React.FC<CardProps> = ({ 
  variant = "default", 
  children, 
  className, 
  ...props 
}) => {
  const baseStyles = "rounded-lg transition-all";
  
  const variants = {
    default: "bg-card text-card-foreground shadow-sm hover:shadow",
    glass: "glass",
    outline: "border border-border bg-transparent",
    gradient: "gradient-border bg-card text-card-foreground shadow-sm hover:shadow",
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { 
  CustomCard, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
};
