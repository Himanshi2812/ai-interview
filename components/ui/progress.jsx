// "use client"

// import * as React from "react"
// import * as ProgressPrimitive from "@radix-ui/react-progress"

// import { cn } from "@/lib/utils"

// const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
//   <ProgressPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
//       className
//     )}
//     {...props}>
//     <ProgressPrimitive.Indicator
//       className="h-full w-full flex-1 bg-primary transition-all"
//       style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
//   </ProgressPrimitive.Root>
// ))
// Progress.displayName = ProgressPrimitive.Root.displayName

// export { Progress }

// components/ui/progress.jsx
export const Progress = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
