import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-[#C4BCC9] outline-none flex h-10 w-full rounded-md border-b border-input bg-background px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-mono font-medium font-mono",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
