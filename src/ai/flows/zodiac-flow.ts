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
  title: z.string().describe("A fun, engaging title for the personality analysis."),
  description: z.string().describe("A general, cheerful paragraph describing the person based on their zodiac."),
  strengths: z.array(z.string()).describe("A list of 3-4 key strengths or positive traits."),
  weaknesses: z.array(z.string()).describe("A list of 1-2 minor challenges or weaknesses, framed constructively."),
  advice: z.string().describe("A short, encouraging piece of advice."),
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
  prompt: `Kamu adalah seorang teman yang sangat pandai membaca bintang dan kepribadian. Gunakan GAYA BAHASA INDONESIA ANAK MUDA yang asik, ceria, dan positif. JANGAN gunakan bahasa Inggris atau bahasa asing lainnya.
Berdasarkan nama, zodiak, jenis kelamin, dan usia yang diberikan, jelaskan kepribadian mereka dalam format JSON yang rapi.
Gunakan tool 'getZodiacDetails' untuk mendapatkan informasi detail tentang zodiak tersebut.

Format output JSON harus seperti ini:
- **title**: Buat judul yang sangat menarik dan khas, contohnya "Ini Dia Si {{zodiac}} Paling Keren!".
- **description**: Tulis deskripsi umum yang seru dan positif tentang mereka.
- **strengths**: Berikan 3-4 poin kekuatan utama mereka.
- **weaknesses**: Sebutkan 1-2 tantangan kecil, tapi sampaikan dengan cara yang membangun dan positif.
- **advice**: Kasih nasihat singkat yang memotivasi dan bikin semangat.

Pastikan semua teks terasa personal, relevan dengan umur dan jenis kelamin mereka, dan 100% menggunakan bahasa Indonesia yang gaul.

Nama: {{{name}}}
Zodiak: {{{zodiak}}}
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
  async (input, streamingCallback, context) => {
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const {output} = await prompt(input);
        return output!;
      } catch (error: any) {
        attempt++;
        if (error.message.includes('503') && attempt < maxRetries) {
          console.log(`Attempt ${attempt} failed with 503 error. Retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          throw error;
        }
      }
    }
    // This line should not be reached if maxRetries > 0, but is needed for type safety.
    throw new Error('All retry attempts failed.');
  }
);
