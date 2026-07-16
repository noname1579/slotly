'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-200 hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border-2 border-purple-200 bg-white/70 backdrop-blur-sm text-purple-600 hover:bg-purple-50 hover:border-purple-300 hover:scale-[1.02] active:scale-[0.98]',
        ghost:
          'text-purple-600 hover:bg-purple-50 hover:scale-[1.02] active:scale-[0.98]',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]',
        link: 'text-purple-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-2',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-14 rounded-2xl px-8 text-base',
        icon: 'h-12 w-12 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };