// components/MaxWidthWrapper.tsx

"use client";

import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Adjust breakpoint as needed

  return (
    <div
      className={cn(
        "w-full",
        isMobile ? "px-4" : "max-w-screen-xl px-4 mx-auto", // Mobile: full width with padding, Desktop: max-width with padding and centered
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
