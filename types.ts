
export interface Language {
    id: string;
    name: string;
}

export interface TranslationResult {
    translatedCode: string;
    notes: string;
}

export interface CodeExample {
    langId: string;
    name: string;
    code: string;
}
