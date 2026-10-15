import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const variants = {
    primary: 'wb-btn--primary',
    secondary: '',
    ghost: 'wb-btn--quiet',
    destructive: 'wb-btn--danger',
};

const sizes = {
    sm: 'wb-btn--sm',
    md: '',
    lg: 'wb-btn--lg',
    icon: 'wb-btn--icon',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'secondary', size = 'md', isLoading, children, ...props }, ref) => (
        <button
            ref={ref}
            className={cn('wb-btn', variants[variant], sizes[size], className)}
            {...props}
        >
            {isLoading && <span className="wb-spin" aria-hidden="true" />}
            {children}
        </button>
    )
);
Button.displayName = 'Button';

export { Button };
