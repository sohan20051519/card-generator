
import React from 'react';

interface AdBannerProps {
    id: string;
    format: 'vertical' | 'horizontal';
    title: string;
    description: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ id, format, title, description }) => {
    const containerClasses = format === 'vertical'
        ? 'w-full h-64' // Example vertical size
        : 'w-full h-24'; // Example horizontal size

    return (
        <div id={id} className={`${containerClasses} p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex flex-col text-gray-400 dark:text-gray-500`}>
            <div className="flex justify-between items-center text-xs">
                <span>Advertisement</span>
                <div className="flex items-center space-x-1">
                    <span>Ad</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-sm mt-1">
                <div className="text-center">
                    <div className="font-bold text-gray-500 dark:text-gray-400">{title}</div>
                    <div className="text-sm">{description}</div>
                </div>
            </div>
        </div>
    );
};
