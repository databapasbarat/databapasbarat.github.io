'use server';

/**
 * @fileOverview Gets the meaning of a name.
 *
 * - getNameMeaning - A function that gets the meaning of a name.
 * - GetNameMeaningInput - The input type for the getNameMeaning function.
 * - GetNameMeaningOutput - The return type for the getNameMeaning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetNameMeaningInputSchema = z.object({
  name: z.string().describe("The person's name."),
});
export type GetNameMeaningInput = z.infer<typeof GetNameMeaningInputSchema>;

const GetNameMeaningOutputSchema = z.object({
  nama: z.string(),
  arti: z.string(),
  catatan: z.string().optional(),
});
export type GetNameMeaningOutput = z.infer<typeof GetNameMeaningOutputSchema>;


const getNameMeaningTool = ai.defineTool(
    {
      name: 'getNameMeaning',
      description: 'Get the meaning of a name from the primbon.',
      inputSchema: z.object({
        name: z.string().describe("The person's full name."),
      }),
      outputSchema: z.any(),
    },
    async (input) => {
      // Use the full name for the API call, replacing spaces with a character the API might handle, or just URL encode it.
      // The API seems to handle single names better, but we will try with the full name.
      const nameForApi = input.name.toLowerCase();
      const url = `https://api.siputzx.my.id/api/primbon/artinama?nama=${encodeURIComponent(nameForApi)}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch name meaning for ${input.name}`);
        }
        const data = await response.json();
        if(data.status === false){
          // Try with just the first name if the full name fails
          const firstName = input.name.split(' ')[0].toLowerCase();
          const fallbackUrl = `https://api.siputzx.my.id/api/primbon/artinama?nama=${firstName}`;
          const fallbackResponse = await fetch(fallbackUrl);
           if (!fallbackResponse.ok) {
              throw new Error(`Failed to fetch name meaning for ${input.name}`);
           }
           const fallbackData = await fallbackResponse.json();
            if(fallbackData.status === false){
                 return {
                    nama: input.name,
                    arti: `Tidak ditemukan arti untuk nama ${input.name}.`,
                  }
            }
           return fallbackData.data;
        }
        return data.data;
      } catch (error) {
         console.error('Error fetching name meaning:', error);
         return {
            nama: input.name,
            arti: `Gagal mengambil data arti untuk nama ${input.name}.`,
          }
      }
    }
  );


const prompt = ai.definePrompt({
  name: 'getNameMeaningPrompt',
  input: {schema: GetNameMeaningInputSchema},
  output: {schema: GetNameMeaningOutputSchema},
  tools: [getNameMeaningTool],
  prompt: `Anda adalah seorang ahli primbon Jawa. Berdasarkan nama yang diberikan, gunakan tool 'getNameMeaning' untuk mendapatkan arti dari nama tersebut.
Kemudian, kembalikan hasilnya dalam format JSON yang telah ditentukan.

Nama: {{{name}}}
`,
});

const getNameMeaningFlow = ai.defineFlow(
  {
    name: 'getNameMeaningFlow',
    inputSchema: GetNameMeaningInputSchema,
    outputSchema: GetNameMeaningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function getNameMeaning(input: GetNameMeaningInput): Promise<GetNameMeaningOutput> {
  return getNameMeaningFlow(input);
}
