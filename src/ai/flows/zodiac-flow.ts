'use server';

/**
 * @fileOverview Generates a personality description based on Zodiac.
 *
 * - getZodiacSign - A function that gets a personality description.
 * - GetZodiacSignInput - The input type for the getZodiacSign function.
 * - GetZodiacSignOutput - The return type for the getZodiacSign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetZodiacSignInputSchema = z.object({
  name: z.string().describe("The person's name."),
  zodiac: z.string().describe("The person's zodiac sign."),
  gender: z.string().describe("The person's gender."),
  age: z.string().describe("The person's age."),
});
export type GetZodiacSignInput = z.infer<typeof GetZodiacSignInputSchema>;

const GetZodiacSignOutputSchema = z.object({
  personality: z.string().describe('A personality description based on the zodiac.'),
});
export type GetZodiacSignOutput = z.infer<typeof GetZodiacSignOutputSchema>;

export async function getZodiacSign(input: GetZodiacSignInput): Promise<GetZodiacSignOutput> {
  return getZodiacSignFlow(input);
}

const getZodiacDetailsTool = ai.defineTool(
  {
    name: 'getZodiacDetails',
    description: 'Get detailed information about a zodiac sign, such as characteristics, strengths, and weaknesses.',
    inputSchema: z.object({
      zodiac: z.string().describe('The zodiac sign to look up.'),
    }),
    outputSchema: z.any(),
  },
  async (input) => {
    const url = `https://api.siputzx.my.id/api/primbon/zodiak?zodiak=${input.zodiac.toLowerCase()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch zodiac details for ${input.zodiac}`);
    }
    const data = await response.json();
    if(data.status === false){
      return `No details found for zodiac ${input.zodiac}`;
    }
    // Return only the data part which contains the description
    return JSON.stringify(data.data);
  }
);


const prompt = ai.definePrompt({
  name: 'getZodiacSignPrompt',
  input: {schema: GetZodiacSignInputSchema},
  output: {schema: GetZodiacSignOutputSchema},
  tools: [getZodiacDetailsTool],
  prompt: `Anda adalah seorang ahli astrologi yang bijaksana. Berdasarkan nama, zodiak, jenis kelamin, dan usia yang diberikan, buatlah deskripsi kepribadian yang ramah, positif, dan mendalam dalam Bahasa Indonesia.
Gunakan tool 'getZodiacDetails' untuk mendapatkan informasi mendalam tentang zodiak yang diberikan.
Berikan analisis yang inspiratif dan puitis tentang kekuatan, potensi, dan mungkin sedikit tantangan yang bisa diwaspadai dengan gaya bahasa yang memotivasi, berdasarkan informasi dari tool dan data yang diberikan. Sesuaikan analisis berdasarkan jenis kelamin dan usia untuk membuatnya lebih personal.

Nama: {{{name}}}
Zodiak: {{{zodiac}}}
Jenis Kelamin: {{{gender}}}
Usia: {{{age}}}
`,
});

const getZodiacSignFlow = ai.defineFlow(
  {
    name: 'getZodiacSignFlow',
    inputSchema: GetZodiacSignInputSchema,
    outputSchema: GetZodiacSignOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
