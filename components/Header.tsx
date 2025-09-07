import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                    Free Credit Card and Debit Card Number Generator
                </h1>
                <p className="text-sm sm:text-md text-slate-500 dark:text-slate-400 mt-1">
                    A safe tool for generating dummy data for testing and development.
                </p>
            </div>
        </header>
    );
};