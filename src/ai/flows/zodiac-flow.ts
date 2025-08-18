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
  prompt: `You are an astrologer. Based on the provided name, zodiac, and shio, generate a friendly and positive personality description in Indonesian.

Name: {{{name}}}
Zodiac: {{{zodiac}}}
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
