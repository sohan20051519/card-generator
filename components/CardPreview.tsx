import React from 'react';
import { CardData, CardType } from '../types';

interface CardPreviewProps {
    card: CardData;
}

const getCardBrandImage = (type: CardType | string): string => {
    // Note: These image paths assume you have corresponding SVG files in your `public` directory.
    // We'll reuse the main brand logos for debit cards.
    if (type.includes(CardType.VISA)) return '/visa-logo.svg';
    if (type.includes(CardType.MASTERCARD)) return '/mastercard-logo.svg';
    
    switch (type) {
        case CardType.AMEX:
            return '/amex-logo.svg';
        case CardType.DISCOVER:
            return '/discover-logo.svg';
        default:
            return '/generic-card-logo.svg';
    }
};

const getCardStyles = (type: CardType | string): { gradient: string; textColor: string } => {
    switch (type) {
        case CardType.VISA:
            return { gradient: 'bg-gradient-to-br from-blue-700 to-blue-900', textColor: 'text-white' };
        case CardType.VISA_DEBIT:
            return { gradient: 'bg-gradient-to-br from-blue-600 to-cyan-800', textColor: 'text-white' };
        case CardType.MASTERCARD:
            return { gradient: 'bg-gradient-to-br from-red-500 to-orange-600', textColor: 'text-white' };
        case CardType.MASTERCARD_DEBIT:
            return { gradient: 'bg-gradient-to-br from-orange-500 to-yellow-600', textColor: 'text-white' };
        case CardType.AMEX:
            return { gradient: 'bg-gradient-to-br from-teal-500 to-teal-700', textColor: 'text-white' };
        case CardType.DISCOVER:
            return { gradient: 'bg-gradient-to-br from-purple-600 to-indigo-800', textColor: 'text-white' };
        default:
            return { gradient: 'bg-gradient-to-br from-gray-700 to-gray-900', textColor: 'text-white' };
    }
};


export const CardPreview: React.FC<CardPreviewProps> = ({ card }) => {
    const { gradient, textColor } = getCardStyles(card.type);
    const isDebit = card.type.toLowerCase().includes('debit');

    return (
        <div className={`w-64 h-40 rounded-lg shadow-xl p-4 flex flex-col justify-between ${gradient} ${textColor} font-mono relative overflow-hidden transition-transform transform hover:scale-105`}>
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full opacity-50"></div>
            <div className="absolute -bottom-12 -left-8 w-32 h-32 border-2 border-white/20 rounded-full opacity-50"></div>

            <div className="flex justify-between items-start z-10">
                <div>
                  <span className="text-xs font-semibold">{card.type.replace(' Debit', '')}</span>
                  {isDebit && <span className="block text-xs font-bold uppercase tracking-widest opacity-80">Debit</span>}
                </div>
                <img src={getCardBrandImage(card.type)} alt={`${card.type} logo`} className="h-8 object-contain" />
            </div>
            
            <div className="text-center text-lg tracking-widest z-10">
                {card.number}
            </div>

            <div className="flex justify-between items-end text-xs z-10">
                <div>
                    <span className="block opacity-70">CARD HOLDER</span>
                    <span>{card.name.toUpperCase()}</span>
                </div>
                <div>
                    <span className="block opacity-70">EXPIRES</span>
                    <span>{card.expiry}</span>
                </div>
            </div>
        </div>
    );
};