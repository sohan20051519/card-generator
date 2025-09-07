import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-800 mt-12 py-6 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Safe Dummy Credit Card and Debit Card Generator. All Rights Reserved.</p>
                <p className="mt-1">This tool is for educational and testing purposes only. See the disclaimer for more information.</p>
            </div>
        </footer>
    );
};