import React, { useState, useEffect } from 'react';
import { CardData, OutputFormat } from '../types';
import { CardPreview } from './CardPreview';
import { AdBanner } from './AdBanner';

interface ResultsProps {
    results: CardData[];
    format: OutputFormat;
}

const ITEMS_PER_PAGE = 10;

export const Results: React.FC<ResultsProps> = ({ results, format }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [results]);

    if (results.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md h-full flex flex-col justify-center space-y-4">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Results</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Generated card numbers will appear here.</p>
                </div>
                <AdBanner
                    id="empty-results-ad"
                    format="horizontal"
                    title="Content Ad"
                    description="Ad placeholder for empty state."
                />
            </div>
        );
    }
    
    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
    const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const shouldShowAd = (index: number) => {
        return (index + 1) % 3 === 0 && index < paginatedResults.length - 1;
    }

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Generated Data</h2>
            
            <div className="space-y-4">
                {paginatedResults.map((card, index) => (
                    <React.Fragment key={index}>
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500">
                        <div className="flex-shrink-0 w-full sm:w-auto">
                            <CardPreview card={card} />
                        </div>
                        <div className="flex-grow w-full text-sm md:text-base">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm break-all">{card.number}</span>
                            </div>
                            <div className="text-slate-600 dark:text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <p><strong>Holder:</strong> {card.name}</p>
                                <p><strong>Expires:</strong> {card.expiry} &nbsp; <strong>CVV:</strong> {card.cvv}</p>
                            </div>
                        </div>
                    </div>
                    {shouldShowAd(index) && (
                         <AdBanner
                            id={`results-ad-${index}`}
                            format="horizontal"
                            title="In-Feed Ad"
                            description="This is a responsive ad placed between content."
                        />
                    )}
                    </React.Fragment>
                ))}
            </div>
            
            <AdBanner
                id="bottom-results-ad"
                format="horizontal"
                title="End of Content Ad"
                description="Ad shown after the results list."
            />

            {totalPages > 1 && (
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-md disabled:opacity-50 transition hover:bg-slate-300 dark:hover:bg-slate-500"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-md disabled:opacity-50 transition hover:bg-slate-300 dark:hover:bg-slate-500"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};