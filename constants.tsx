import { CardType } from './types';

export const CARD_CONFIG: Record<string, { prefixes: string[], length: number, cvvLength: number }> = {
    [CardType.VISA]: {
        prefixes: ['4'],
        length: 16,
        cvvLength: 3,
    },
    [CardType.MASTERCARD]: {
        prefixes: ['51', '52', '53', '54', '55'],
        length: 16,
        cvvLength: 3,
    },
    [CardType.AMEX]: {
        prefixes: ['34', '37'],
        length: 15,
        cvvLength: 4,
    },
    [CardType.DISCOVER]: {
        prefixes: ['6011', '65'],
        length: 16,
        cvvLength: 3,
    },
    [CardType.VISA_DEBIT]: {
        prefixes: ['4'], // Same as Visa
        length: 16,
        cvvLength: 3,
    },
    [CardType.MASTERCARD_DEBIT]: {
        prefixes: ['51', '52', '53', '54', '55'], // Same as Mastercard
        length: 16,
        cvvLength: 3,
    },
};