
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeEditor } from './components/CodeEditor';
import { ResultDisplay } from './components/ResultDisplay';
import { ExampleSnippets } from './components/ExampleSnippets';
import { translateCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import type { Language, TranslationResult, CodeExample } from './types';

const SwapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);


export default function App() {
    const [sourceLang, setSourceLang] = useState<Language>(SUPPORTED_LANGUAGES[0]);
    const [targetLang, setTargetLang] = useState<Language>(SUPPORTED_LANGUAGES[1]);
    const [sourceCode, setSourceCode] = useState<string>('SELECT col1, col2\nFROM tabela\nWHERE coluna > 100;');
    const [result, setResult] = useState<TranslationResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleTranslate = useCallback(async () => {
        if (!sourceCode.trim()) {
            setError("O código-fonte não pode estar vazio.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const translation = await translateCode(sourceCode, sourceLang.name, targetLang.name);
            setResult(translation);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [sourceCode, sourceLang, targetLang]);
    
    const handleSwapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    const handleSelectExample = useCallback((example: CodeExample) => {
        const lang = SUPPORTED_LANGUAGES.find(l => l.id === example.langId);
        if (lang) {
            setSourceLang(lang);
            setSourceCode(example.code);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <LanguageSelector selectedLang={sourceLang} setSelectedLang={setSourceLang} />
                    <button 
                        onClick={handleSwapLanguages}
                        className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white transition-all duration-200"
                        aria-label="Trocar linguagens"
                    >
                       <SwapIcon className="w-6 h-6" />
                    </button>
                    <LanguageSelector selectedLang={targetLang} setSelectedLang={setTargetLang} />
                </div>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CodeEditor 
                        code={sourceCode} 
                        setCode={setSourceCode} 
                        languageName={sourceLang.name} 
                    />
                    <ResultDisplay 
                        result={result} 
                        isLoading={isLoading} 
                        error={error}
                        targetLang={targetLang}
                    />
                </div>
                 <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleTranslate}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-12 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300"
                    >
                        {isLoading ? 'Traduzindo...' : 'Traduzir'}
                    </button>
                </div>

                <div className="mt-12">
                    <ExampleSnippets onSelect={handleSelectExample} />
                </div>
            </main>
        </div>
    );
}