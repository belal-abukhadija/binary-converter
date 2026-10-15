import * as React from 'react';

interface StatsDisplayProps {
    text: string;
}

export function StatsDisplay({ text }: StatsDisplayProps) {
    const stats = React.useMemo(() => {
        const bytes = new TextEncoder().encode(text).length;
        return [
            { label: 'Bytes (UTF-8)', value: bytes },
            { label: 'Bits', value: bytes * 8 },
            { label: 'Characters', value: [...text].length },
            { label: 'Words', value: text.trim() ? text.trim().split(/\s+/).length : 0 },
        ];
    }, [text]);

    return (
        <div className="wb-stats" aria-live="polite">
            {stats.map((s, i) => (
                <div key={s.label} className={`wb-stat${i === 0 ? ' wb-stat--lead' : ''}`}>
                    <span className="wb-stat-value">{s.value.toLocaleString()}</span>
                    <span className="wb-stat-label">{s.label}</span>
                </div>
            ))}
        </div>
    );
}
