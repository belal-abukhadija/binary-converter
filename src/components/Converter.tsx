'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { StatsDisplay } from '@/components/StatsDisplay';
import { textToBinary, binaryToText } from '@/lib/converter';

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = async () => {
        if (!value) return;
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <Button size="sm" onClick={handleCopy} disabled={!value}>
            {copied ? <Check /> : <Copy />}
            {copied ? 'Copied' : 'Copy'}
        </Button>
    );
}

export function Converter() {
    const [text, setText] = React.useState('');
    const [binary, setBinary] = React.useState('');
    const [error, setError] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Auto-convert Text -> Binary
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        setError(false);

        try {
            if (!newText) {
                setBinary('');
                return;
            }
            setBinary(textToBinary(newText));
        } catch (err) {
            console.error(err);
        }
    };

    // Auto-convert Binary -> Text
    const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBinary = e.target.value;
        setBinary(newBinary);

        try {
            if (!newBinary.trim()) {
                setText('');
                setError(false);
                return;
            }
            setText(binaryToText(newBinary));
            setError(false);
        } catch {
            // Keep the last good text while the user is mid-edit; flag the binary as invalid.
            setError(true);
        }
    };

    const clearAll = () => {
        setText('');
        setBinary('');
        setError(false);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setText(content);
            try {
                setBinary(textToBinary(content));
                setError(false);
            } catch (err) {
                console.error(err);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const downloadResult = () => {
        const element = document.createElement("a");
        const file = new Blob([binary], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "binary_output.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="wb-stack">
            <StatsDisplay text={text} />

            <div className="wb-bench wb-bench--even">
                <section className="wb-panel" aria-labelledby="text-pane">
                    <div className="wb-panel-head">
                        <h2 id="text-pane" className="wb-h2">Text</h2>
                        <div className="wb-row">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".txt"
                                onChange={handleFileUpload}
                            />
                            <Button size="sm" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                                <Upload /> Open .txt
                            </Button>
                            <CopyButton value={text} />
                        </div>
                    </div>
                    <TextArea
                        label="Text"
                        placeholder="Type or paste text here"
                        value={text}
                        onChange={handleTextChange}
                        style={{ minHeight: 340, fontSize: '1.125rem' }}
                    />
                </section>

                <section className="wb-panel" aria-labelledby="binary-pane">
                    <div className="wb-panel-head">
                        <h2 id="binary-pane" className="wb-h2">Binary</h2>
                        <div className="wb-row">
                            <Button size="sm" variant="ghost" onClick={downloadResult} disabled={!binary}>
                                <Download /> Save .txt
                            </Button>
                            <CopyButton value={binary} />
                        </div>
                    </div>
                    <TextArea
                        label="Binary"
                        placeholder="01001000 01101001"
                        value={binary}
                        onChange={handleBinaryChange}
                        isError={error}
                        errorText="Only 0, 1 and spaces, in groups of 8 bits. Fix the highlighted input to update the text."
                        className="wb-textarea--code"
                        style={{ minHeight: 340, letterSpacing: '0.04em' }}
                    />
                </section>
            </div>

            <div className="wb-row wb-row--end">
                <Button variant="destructive" onClick={clearAll} disabled={!text && !binary}>
                    <RotateCcw /> Clear both
                </Button>
            </div>
        </div>
    );
}

