
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center space-x-3">
                    <svg className="w-10 h-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Code Syntax Companion
                    </h1>
                </div>
            </div>
        </header>
    );
};
