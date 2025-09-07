// FIX: Implemented card generation logic to resolve module errors.
import { GeneratorOptions, CardData, CardType } from '../types';
import { CARD_CONFIG } from '../constants';

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Calculates the Luhn algorithm checksum digit for a partial card number.
 * @param partialNumber The card number without the last digit.
 * @returns The checksum digit as a string.
 */
const calculateLuhnDigit = (partialNumber: string): string => {
    let sum = 0;
    const { length } = partialNumber;
    
    // We want to double every second digit from the right.
    // This is equivalent to doubling digits at odd/even indices from the left
    // depending on the parity of the length of the partial number.
    const doubleFromLeft = (length - 1) % 2;

    for (let i = 0; i < length; i++) {
        let digit = parseInt(partialNumber[i], 10);
        if (i % 2 === doubleFromLeft) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }

    // The checksum digit is calculated to make the total sum a multiple of 10.
    const checksum = (sum * 9) % 10;
    return checksum.toString();
};

/**
 * Generates a card number based on prefix, length, and Luhn validity.
 */
const generateCardNumber = (prefix: string, length: number, luhnValid: boolean): string => {
    let number = prefix;
    const remainingLength = length - prefix.length;

    if (luhnValid) {
        // Generate random digits, leaving one for the Luhn checksum.
        const randomLength = remainingLength - 1;
        for (let i = 0; i < randomLength; i++) {
            number += getRandomNumber(0, 9).toString();
        }
        // Append the Luhn checksum digit.
        number += calculateLuhnDigit(number);
    } else {
        // Generate random digits for the entire remaining length.
        for (let i = 0; i < remainingLength; i++) {
            number += getRandomNumber(0, 9).toString();
        }
    }
    return number;
};

/**
 * Generates a random CVV of a given length.
 */
const generateCVV = (length: number): string => {
    let cvv = '';
    for (let i = 0; i < length; i++) {
        cvv += getRandomNumber(0, 9).toString();
    }
    return cvv;
};

/**
 * Generates a random future expiry date in MM/YY format.
 */
const generateExpiryDate = (): string => {
    const currentYear = new Date().getFullYear();
    const expiryYear = getRandomNumber(currentYear + 1, currentYear + 6);
    const expiryMonth = getRandomNumber(1, 12);
    return `${expiryMonth.toString().padStart(2, '0')}/${expiryYear.toString().slice(-2)}`;
};

/**
 * Generates a random cardholder name.
 */
const generateName = (): string => {
    const firstNames = ['John', 'Jane', 'Peter', 'Susan', 'Michael', 'Emily', 'Chris', 'Jessica', 'David', 'Sarah'];
    const lastNames = ['Smith', 'Doe', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
};

/**
 * Generates an array of card data objects based on the provided options.
 * @param options The generator options.
 * @returns An array of CardData objects.
 */
export const generateCards = (options: GeneratorOptions): CardData[] => {
    const cards: CardData[] = [];
    const availableCardTypes = Object.keys(CARD_CONFIG) as (keyof typeof CARD_CONFIG)[];

    for (let i = 0; i < options.quantity; i++) {
        let cardType: CardType | string = options.cardType;
        if (cardType === CardType.RANDOM) {
            cardType = getRandomElement(availableCardTypes);
        }

        const config = CARD_CONFIG[cardType];
        if (!config) {
            console.warn(`Configuration for card type "${cardType}" not found. Skipping.`);
            continue;
        }

        const prefix = getRandomElement(config.prefixes);
        const number = generateCardNumber(prefix, config.length, options.luhnValid);
        
        const cvv = options.includeDetails ? generateCVV(config.cvvLength) : '';
        const expiry = options.includeDetails ? generateExpiryDate() : '';
        const name = options.includeDetails ? generateName() : 'Card Holder';

        cards.push({
            type: cardType,
            number,
            cvv,
            expiry,
            name,
        });
    }

    return cards;
};
