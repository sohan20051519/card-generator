export enum CardType {
    VISA = 'Visa',
    MASTERCARD = 'Mastercard',
    AMEX = 'American Express',
    DISCOVER = 'Discover',
    VISA_DEBIT = 'Visa Debit',
    MASTERCARD_DEBIT = 'Mastercard Debit',
    RANDOM = 'Any',
}

export enum OutputFormat {
    JSON = 'JSON',
    CSV = 'CSV',
    TXT = 'TXT',
    PLAINTEXT = 'Plain Text',
}

export interface CardData {
    type: CardType | string;
    number: string;
    cvv: string;
    expiry: string;
    name: string;
}

export interface GeneratorOptions {
    cardType: CardType;
    outputFormat: OutputFormat;
    quantity: number;
    includeDetails: boolean;
    luhnValid: boolean;
}