
import React from 'react';

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    languageName: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, languageName }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-inner flex flex-col h-full min-h-[300px] lg:min-h-0">
            <div className="px-4 py-2 bg-gray-700/50 rounded-t-lg">
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Código-fonte ({languageName})</h2>
            </div>
            <div className="flex-grow p-1">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={`Digite o código ${languageName} aqui...`}
                    className="w-full h-full p-3 font-mono text-sm text-gray-200 bg-transparent resize-none focus:outline-none placeholder-gray-500"
                    spellCheck="false"
                />
            </div>
        </div>
    );
};
