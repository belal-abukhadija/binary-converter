import * as React from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    isError?: boolean;
    errorText?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, label, isError, errorText = 'Not valid binary', id, ...props }, ref) => {
        const autoId = React.useId();
        const fieldId = id ?? autoId;
        return (
            <div>
                <label htmlFor={fieldId} className="wb-sr">{label}</label>
                <textarea
                    ref={ref}
                    id={fieldId}
                    aria-invalid={isError || undefined}
                    className={cn('wb-textarea', className)}
                    spellCheck={false}
                    dir="auto"
                    {...props}
                />
                {isError && <p className="wb-error" role="status">{errorText}</p>}
            </div>
        );
    }
);
TextArea.displayName = 'TextArea';

export { TextArea };
