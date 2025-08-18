'use server';

/**
 * @fileOverview Generates an image based on a textual description.
 *
 * - generateImage - A function that generates an image.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  name: z.string().describe("The person's name."),
  zodiac: z.string().describe("The person's zodiac sign."),
  shio: z.string().describe("The person's shio."),
  summary: z.string().describe('A summary of the person based on NIK data.')
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const prompt = `Buatlah potret artistik yang futuristik dan sureal dari seseorang bernama ${input.name}. 
    Zodiaknya adalah ${input.zodiac} dan shionya adalah ${input.shio}.
    Gabungkan elemen kosmik dan fantasi yang mewakili zodiak dan shio mereka secara halus. 
    Konteks tambahan: ${input.summary}.
    Gaya gambar harus menyerupai lukisan digital sinematik dengan pencahayaan dramatis, detail yang kaya, dan estetika profesional yang cocok untuk avatar digital.`;
    
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media.url;
    if (!imageUrl) {
        throw new Error('Image generation failed.');
    }

    return { imageUrl };
  }
);
