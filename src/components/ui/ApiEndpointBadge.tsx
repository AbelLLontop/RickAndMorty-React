import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiEndpointBadgeProps {
    url: string;
    label?: string;
    variant?: 'full' | 'minimal';
}

export const ApiEndpointBadge = ({ url, label = 'API Endpoint', variant = 'full' }: ApiEndpointBadgeProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (variant === 'minimal') {
        return (
            <div className="flex items-center gap-2 group/endpoint">
                <code className="text-xs sm:text-sm font-mono text-slate-800 truncate lowercase font-bold tracking-tight">
                    {url}
                </code>
                <button
                    onClick={handleCopy}
                    className={cn(
                        'p-2 rounded-xl transition-all duration-300 flex items-center justify-center shrink-0',
                        copied
                            ? 'text-emerald-500 scale-110'
                            : 'text-slate-400 hover:text-primary active:scale-90'
                    )}
                    title="Copy Endpoint"
                >
                    {copied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={2.5} />}
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/40 transition-all duration-500 w-full sm:w-fit group/endpoint overflow-hidden">
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <div className="absolute w-1.5 h-1.5 rounded-full bg-primary animate-ping opacity-30" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-primary/70 uppercase tracking-widest whitespace-nowrap">
                        {label}
                    </span>
                </div>
                <code className="text-xs sm:text-sm font-mono text-slate-800 truncate lowercase font-bold tracking-tight block">
                    {url}
                </code>
            </div>
            <div className="h-8 w-[1px] bg-slate-100 mx-1 sm:mx-2 shrink-0" />
            <button
                onClick={handleCopy}
                className={cn(
                    'p-2 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] shrink-0',
                    copied
                        ? 'text-emerald-500 bg-emerald-50 scale-110 shadow-inner'
                        : 'text-slate-400 hover:text-primary hover:bg-primary/5 active:scale-90 group-hover/endpoint:scale-105'
                )}
                title="Copy Endpoint"
            >
                {copied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={2.5} />}
            </button>
        </div>
    );
};
