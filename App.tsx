// FIX: Implemented the main App component to structure the application UI and manage state.
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Results } from './components/Results';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { CardData, GeneratorOptions, CardType, OutputFormat } from './types';
import { generateCards } from './services/generator';

const App: React.FC = () => {
    const [options, setOptions] = useState<GeneratorOptions>({
        cardType: CardType.RANDOM,
        outputFormat: OutputFormat.JSON,
        quantity: 2,
        includeDetails: true,
        luhnValid: true,
    });
    const [results, setResults] = useState<CardData[]>([]);

    const handleGenerate = () => {
        try {
            const cards = generateCards(options);
            setResults(cards);
        } catch (err) {
            console.error("Failed to generate cards:", err);
            // Optionally set an error state here if the local generator could fail
        }
    };

    const handleClear = () => {
        setResults([]);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200">
            <Header />
            <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                 <AdBanner
                    id="top-leaderboard-ad"
                    format="horizontal"
                    title="Leaderboard Ad"
                    description="A prominent ad spot below the header."
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-1 space-y-8">
                        <Controls
                            options={options}
                            onOptionsChange={setOptions}
                            onGenerate={handleGenerate}
                            onClear={handleClear}
                            results={results}
                        />
                         <AdBanner
                            id="sidebar-ad"
                            format="vertical"
                            title="Vertical Ad"
                            description="Ad placeholder for the sidebar."
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <Results results={results} format={options.outputFormat} />
                    </div>
                </div>
                <Disclaimer />
                <div className="mt-8">
                    <AdBanner
                        id="post-disclaimer-ad"
                        format="horizontal"
                        title="Content Ad"
                        description="Ad shown after the main disclaimer."
                    />
                </div>
            </main>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                 <AdBanner
                    id="pre-footer-ad"
                    format="horizontal"
                    title="Bottom Banner Ad"
                    description="A final ad spot before the footer."
                />
            </div>
            <Footer />
        </div>
    );
};

export default App;
