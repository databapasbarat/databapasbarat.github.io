'use server';

/**
 * @fileOverview Summarizes NIK data using a generative AI model.
 *
 * - summarizeNikData - A function that summarizes the NIK data.
 * - SummarizeNikDataInput - The input type for the summarizeNikData function.
 * - SummarizeNikDataOutput - The return type for the summarizeNikData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNikDataInputSchema = z.object({
  nikData: z.string().describe('The NIK data to summarize in JSON format.'),
});
export type SummarizeNikDataInput = z.infer<typeof SummarizeNikDataInputSchema>;

const SummarizeNikDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the NIK data.'),
});
export type SummarizeNikDataOutput = z.infer<typeof SummarizeNikDataOutputSchema>;

export async function summarizeNikData(input: SummarizeNikDataInput): Promise<SummarizeNikDataOutput> {
  return summarizeNikDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNikDataPrompt',
  input: {schema: SummarizeNikDataInputSchema},
  output: {schema: SummarizeNikDataOutputSchema},
  prompt: `You are an expert in summarizing personal data.
  Given the following NIK data, generate a concise summary highlighting the most relevant details such as name, age, location, and other important metadata to quickly understand the individual's profile.  Keep the summary to under 100 words.

  NIK Data: {{{nikData}}}
  `,
});

const summarizeNikDataFlow = ai.defineFlow(
  {
    name: 'summarizeNikDataFlow',
    inputSchema: SummarizeNikDataInputSchema,
    outputSchema: SummarizeNikDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
