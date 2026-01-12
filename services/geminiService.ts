
import { GoogleGenAI, Type } from "@google/genai";
import type { TranslationResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const translationSchema = {
    type: Type.OBJECT,
    properties: {
        translatedCode: {
            type: Type.STRING,
            description: "The direct translation of the code snippet into the target language. This should be a raw code string.",
        },
        notes: {
            type: Type.STRING,
            description: "Uma breve explicação em Português do Brasil sobre quaisquer diferenças idiomáticas, principais mudanças sintáticas ou considerações importantes. Use Markdown para formatação, se necessário.",
        },
    },
    required: ["translatedCode", "notes"],
};

export async function translateCode(
    sourceCode: string,
    sourceLang: string,
    targetLang: string
): Promise<TranslationResult> {
    const isMicroflow = sourceCode.includes('// This is a textual representation of a Mendix Microflow');

    const prompt = `
Translate the following code snippet from ${sourceLang} to ${targetLang}.

Source Code (${sourceLang}):
\`\`\`${sourceLang}
${sourceCode}
\`\`\`

Provide the translated code and brief, helpful notes in Brazilian Portuguese on any important syntactical or idiomatic differences.${isMicroflow ? '\nFor Mendix Microflows, the explanation in the notes must be a bulleted list detailing each step of the logic.' : ''}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: translationSchema,
                temperature: 0.2,
            },
        });

        const jsonString = response.text;
        if (!jsonString) {
            throw new Error("Received an empty response from the API.");
        }

        const parsedResult = JSON.parse(jsonString);
        
        return {
            translatedCode: parsedResult.translatedCode || '',
            notes: parsedResult.notes || 'Nenhuma nota fornecida.',
        };

    } catch (error) {
        console.error("Error calling API:", error);
        throw new Error("Failed to translate code. Please check the console for details.");
    }
}