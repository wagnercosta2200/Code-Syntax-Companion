
import React from 'react';
import { CODE_EXAMPLES } from '../constants';
import type { CodeExample } from '../types';

interface ExampleSnippetsProps {
    onSelect: (example: CodeExample) => void;
}

export const ExampleSnippets: React.FC<ExampleSnippetsProps> = ({ onSelect }) => {
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-center text-gray-300 mb-6">
                Ou experimente com um exemplo
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {CODE_EXAMPLES.map((example) => (
                    <button
                        key={`${example.langId}-${example.name}`}
                        onClick={() => onSelect(example)}
                        className="text-center p-3 bg-gray-800 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200"
                    >
                        <span className="text-sm font-medium text-gray-200">{example.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};