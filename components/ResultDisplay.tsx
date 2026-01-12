
import React, { useState } from 'react';
import { Spinner } from './Spinner';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import type { TranslationResult, Language } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface ResultDisplayProps {
    result: TranslationResult | null;
    isLoading: boolean;
    error: string | null;
    targetLang: Language;
}

interface CodeBlockProps {
    code: string;
    language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getHighlightLanguage = (langId: string) => {
        switch(langId) {
            case 'powerfx':
                return 'javascript'; // Use JS for similar syntax
            case 'mendix':
            case 'oql': // OQL (Object Query Language) is very similar to SQL.
                return 'sql'; // Map to SQL for syntax highlighting.
            case 'ezhil':
                return 'text';
            default:
                return langId;
        }
    };

    const formatCode = (codeString: string): string => {
        if (!codeString) return '';

        // Step 1: Normalize tabs to spaces for consistent indentation logic.
        const normalizedTabs = codeString.replace(/\t/g, '  ');
        const lines = normalizedTabs.split('\n');
        
        // Step 2: Find the minimum indentation of any non-empty line.
        // This will be the common leading whitespace to remove from the block.
        let minIndent = Infinity;
        for (const line of lines) {
            if (line.trim().length > 0) {
                const indent = line.match(/^\s*/)?.[0].length ?? 0;
                minIndent = Math.min(minIndent, indent);
            }
        }

        let dedentedLines = lines;
        // Step 3: If a common indentation is found, remove it from every line.
        // A line consisting of only whitespace is treated as if it were empty.
        if (minIndent > 0 && minIndent !== Infinity) {
            dedentedLines = lines.map(line => {
                // For lines that are shorter than the indent (e.g., empty lines),
                // substring will correctly return an empty string.
                return line.substring(minIndent);
            });
        }
        
        // Step 4: Join the processed lines and trim any leading or trailing
        // blank lines from the final result.
        const joined = dedentedLines.join('\n');
        return joined.replace(/^(\s*\r?\n)+|(\s*\r?\n)+$/g, '');
    };


    return (
        <div className="relative group">
            <SyntaxHighlighter
                language={getHighlightLanguage(language)}
                style={vscDarkPlus}
                customStyle={{ 
                    margin: 0, 
                    borderRadius: '0.375rem', 
                    padding: '1.25rem',
                }}
                codeTagProps={{ className: 'font-mono text-base leading-relaxed' }}
            >
                {formatCode(code)}
            </SyntaxHighlighter>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-gray-800/50 rounded-md text-gray-300 hover:bg-gray-700/50 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Copiar código"
            >
                {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
        </div>
    );
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error, targetLang }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Spinner />
                    <p className="mt-4 text-lg">Gerando tradução...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center h-full p-4">
                    <div className="text-center text-red-400">
                        <h3 className="text-xl font-semibold mb-2">Falha na Tradução</h3>
                        <p>{error}</p>
                    </div>
                </div>
            );
        }

        if (result) {
            return (
                <div className="space-y-6 p-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-3">Código Traduzido</h3>
                        <CodeBlock code={result.translatedCode} language={targetLang.id} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-3">Notas</h3>
                        <div className="prose prose-base prose-invert text-gray-300 p-5 bg-gray-900/50 rounded-md min-h-[120px]">
                            <p>{result.notes}</p>
                        </div>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <p>Seu código traduzido aparecerá aqui.</p>
            </div>
        );

    };
    
    return (
        <div className="bg-gray-800 rounded-lg shadow-inner flex flex-col h-full min-h-[300px] lg:min-h-0">
             <div className="px-4 py-2 bg-gray-700/50 rounded-t-lg">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resultado</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};