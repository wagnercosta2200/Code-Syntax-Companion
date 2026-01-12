
import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import type { Language } from '../types';

interface LanguageSelectorProps {
    selectedLang: Language;
    setSelectedLang: (lang: Language) => void;
}

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLang, setSelectedLang }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (lang: Language) => {
        setSelectedLang(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full sm:w-64">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-200"
            >
                <span className="font-medium">{selectedLang.name}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <ul className="absolute z-20 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <li
                            key={lang.id}
                            onClick={() => handleSelect(lang)}
                            className={`px-4 py-2 cursor-pointer hover:bg-indigo-600 ${selectedLang.id === lang.id ? 'bg-indigo-700' : ''}`}
                        >
                            {lang.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
