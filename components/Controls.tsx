import React from 'react';
import { CardData, GeneratorOptions, CardType, OutputFormat } from '../types';

interface ControlsProps {
    options: GeneratorOptions;
    onOptionsChange: (options: GeneratorOptions) => void;
    onGenerate: () => void;
    onClear: () => void;
    results: CardData[];
}

const formatData = (data: CardData[], format: OutputFormat, includeDetails: boolean): string => {
    const keys: (keyof CardData)[] = includeDetails ? ['type', 'number', 'cvv', 'expiry', 'name'] : ['type', 'number'];
    const getCardData = (card: CardData) => {
        const newCard: Partial<CardData> = { type: card.type, number: card.number };
        if (includeDetails) {
            newCard.cvv = card.cvv;
            newCard.expiry = card.expiry;
            newCard.name = card.name;
        }
        return keys.reduce((obj, key) => ({ ...obj, [key]: card[key] }), {});
    };

    switch (format) {
        case OutputFormat.JSON:
            return JSON.stringify(data.map(getCardData), null, 2);
        case OutputFormat.CSV:
            const headers = keys.join(',');
            const csvRows = data.map(card => keys.map(key => `"${card[key]}"`).join(','));
            return [headers, ...csvRows].join('\n');
        case OutputFormat.TXT:
        case OutputFormat.PLAINTEXT:
        default:
            return data.map(card => keys.map(key => card[key]).join(' ')).join('\n');
    }
};

export const Controls: React.FC<ControlsProps> = ({ options, onOptionsChange, onGenerate, onClear, results }) => {
    
    const handleCopy = () => {
        if (results.length > 0) {
            const dataString = formatData(results, options.outputFormat, options.includeDetails);
            navigator.clipboard.writeText(dataString).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    };

    const handleDownload = () => {
        if (results.length > 0) {
            const mimeTypeMap = {
                [OutputFormat.JSON]: 'application/json',
                [OutputFormat.CSV]: 'text/csv',
                [OutputFormat.TXT]: 'text/plain',
                [OutputFormat.PLAINTEXT]: 'text/plain',
            };
            const extensionMap = {
                [OutputFormat.JSON]: 'json',
                [OutputFormat.CSV]: 'csv',
                [OutputFormat.TXT]: 'txt',
                [OutputFormat.PLAINTEXT]: 'txt',
            };
            
            const dataString = formatData(results, options.outputFormat, options.includeDetails);
            const blob = new Blob([dataString], { type: mimeTypeMap[options.outputFormat] });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dummy-cards.${extensionMap[options.outputFormat]}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
    
    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Options</h2>

            <div>
                <label htmlFor="cardType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type of Card?</label>
                <select
                    id="cardType"
                    value={options.cardType}
                    onChange={(e) => onOptionsChange({ ...options, cardType: e.target.value as CardType })}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                >
                    {Object.values(CardType).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Output Format?</label>
                <div className="flex flex-wrap gap-2">
                    {Object.values(OutputFormat).map(format => (
                        <label key={format} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                            <input
                                type="radio"
                                name="outputFormat"
                                value={format}
                                checked={options.outputFormat === format}
                                onChange={() => onOptionsChange({ ...options, outputFormat: format })}
                                className="form-radio h-4 w-4 text-blue-600 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{format}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">How many Credit Card Numbers?</label>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={options.quantity}
                    onChange={(e) => onOptionsChange({ ...options, quantity: parseInt(e.target.value, 10) || 1 })}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                />
            </div>
            
            <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Include Expiration & CVV?</span>
                    <div className="relative">
                         <input type="checkbox" className="sr-only peer" checked={options.includeDetails} onChange={() => onOptionsChange({...options, includeDetails: !options.includeDetails})} />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-500 peer-checked:bg-blue-600"></div>
                    </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Luhn-valid (for UI only)?</span>
                     <div className="relative">
                         <input type="checkbox" className="sr-only peer" checked={options.luhnValid} onChange={() => onOptionsChange({...options, luhnValid: !options.luhnValid})} />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-500 peer-checked:bg-blue-600"></div>
                    </div>
                </label>
                 <div className="flex items-start space-x-3 text-slate-500 dark:text-slate-400 opacity-50 p-2">
                    <input id="official-numbers" type="checkbox" className="h-4 w-4 mt-1 border-slate-300 rounded" disabled />
                    <div>
                        <label htmlFor="official-numbers" className="text-sm font-medium cursor-not-allowed">Use official processor test numbers?</label>
                        <p className="text-xs">Disabled. Paste official numbers from your payment provider for integration tests.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={onGenerate}
                    title="Creates clearly labeled placeholder test card entries suitable for UI/testing"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Generate
                </button>
                <button
                    onClick={onClear}
                    className="w-full bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-2 px-4 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Clear
                </button>
                <button
                    onClick={handleCopy}
                    disabled={results.length === 0}
                    className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Copy
                </button>
                <button
                    onClick={handleDownload}
                    disabled={results.length === 0}
                    className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Download
                </button>
            </div>
        </div>
    );
};