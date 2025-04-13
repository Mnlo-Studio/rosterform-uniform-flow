
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "success" | "warning" | "error" | "neutral" | "info" | "pending" | "paid" | "unpaid";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const getStatusStyles = (status: StatusType) => {
  switch (status) {
    case "success":
      return "bg-success-100 text-success-700";
    case "warning":
      return "bg-warning-100 text-warning-700";
    case "error":
      return "bg-error-100 text-error-700";
    case "info":
      return "bg-primary-100 text-primary-700";
    case "neutral":
      return "bg-neutral-100 text-neutral-700";
    case "pending":
      return "bg-warning-100 text-warning-700";
    case "paid":
      return "bg-success-100 text-success-700";
    case "unpaid":
      return "bg-error-100 text-error-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

const getStatusLabel = (status: StatusType): string => {
  switch (status) {
    case "success":
      return "Success";
    case "warning":
      return "Warning";
    case "error":
      return "Error";
    case "info":
      return "Info";
    case "neutral":
      return "Neutral";
    case "pending":
      return "Pending";
    case "paid":
      return "Paid";
    case "unpaid":
      return "Unpaid";
    default:
      // Type assertion to string to ensure TypeScript knows we're working with a string
      return (status as string).charAt(0).toUpperCase() + (status as string).slice(1);
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  className 
}) => {
  const displayLabel = label || getStatusLabel(status);
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getStatusStyles(status),
        className
      )}
    >
      {displayLabel}
    </span>
  );
};

export { StatusBadge };
export type { StatusType };
