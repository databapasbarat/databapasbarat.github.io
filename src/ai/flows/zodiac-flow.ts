'use server';

/**
 * @fileOverview Generates a personality description based on Zodiac and Shio.
 *
 * - getZodiacSign - A function that gets a personality description.
 * - GetZodiacSignInput - The input type for the getZodiacSign function.
 * - GetZodiacSignOutput - The return type for the getZodiacSign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetZodiacSignInputSchema = z.object({
  name: z.string().describe('The person\'s name.'),
  zodiac: z.string().describe('The person\'s zodiac sign.'),
  shio: z.string().describe('The person\'s shio.'),
});
export type GetZodiacSignInput = z.infer<typeof GetZodiacSignInputSchema>;

const GetZodiacSignOutputSchema = z.object({
  personality: z.string().describe('A personality description based on the zodiac and shio.'),
});
export type GetZodiacSignOutput = z.infer<typeof GetZodiacSignOutputSchema>;

export async function getZodiacSign(input: GetZodiacSignInput): Promise<GetZodiacSignOutput> {
  return getZodiacSignFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getZodiacSignPrompt',
  input: {schema: GetZodiacSignInputSchema},
  output: {schema: GetZodiacSignOutputSchema},
  prompt: `Anda adalah seorang ahli astrologi dan ahli Feng Shui yang bijaksana. Berdasarkan nama, zodiak, dan shio yang diberikan, buatlah deskripsi kepribadian yang ramah, positif, dan mendalam dalam Bahasa Indonesia.
Berikan analisis yang inspiratif tentang kekuatan, potensi, dan mungkin sedikit tantangan yang bisa diwaspadai dengan gaya bahasa yang puitis dan memotivasi.

Nama: {{{name}}}
Zodiak: {{{zodiac}}}
Shio: {{{shio}}}
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
