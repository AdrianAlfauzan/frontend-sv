"use client";

interface BadgeProps {
  status: "Publish" | "Draft" | "Thrash";
  className?: string;
}

export default function Badge({ status, className = "" }: BadgeProps) {
  const variants = {
    Publish: "bg-green-100 text-green-800",
    Draft: "bg-yellow-100 text-yellow-800",
    Thrash: "bg-red-100 text-red-800",
  };

  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[status]} ${className}`}>{status}</span>;
}
