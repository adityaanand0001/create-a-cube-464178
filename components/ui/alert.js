
import React from "react";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

const variantStyles = {
  default: {
    bg: "bg-gray-50",
    border: "border-gray-300",
    iconColor: "text-gray-600",
    titleColor: "text-gray-900",
    descriptionColor: "text-gray-600"
  },
  destructive: {
    bg: "bg-red-50",
    border: "border-red-300",
    iconColor: "text-red-500",
    titleColor: "text-red-900",
    descriptionColor: "text-red-700"
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-300",
    iconColor: "text-green-500",
    titleColor: "text-green-900",
    descriptionColor: "text-green-700"
  }
};

const icons = {
  default: <Info className="h-5 w-5" />,
  destructive: <XCircle className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />
};

export const Alert = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const styles = variantStyles[variant] || variantStyles.default;
  return (
    <div
      ref={ref}
      className={`relative w-full rounded-lg border p-4 ${styles.bg} ${styles.border} ${className}`}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5 ref={ref} className={`mb-1 font-medium leading-none tracking-tight ${className}`} {...props} />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className}`} {...props} />
));
AlertDescription.displayName = "AlertDescription";
