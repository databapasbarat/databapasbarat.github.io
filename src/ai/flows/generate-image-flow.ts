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
  zodiacDescription: z.string().describe("The personality description based on the zodiac sign."),
  nameMeaning: z.string().describe("The meaning of the person's name."),
  gender: z.string().describe("The person's gender."),
  age: z.string().describe("The person's age."),
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
    const prompt = `Buatlah potret artistik yang futuristik dan sureal dari seseorang bernama ${input.name}, seorang ${input.gender} berusia ${input.age} tahun.
    Zodiaknya adalah ${input.zodiac}.
    Deskripsi kepribadian berdasarkan zodiak: ${input.zodiacDescription}.
    Arti namanya adalah: ${input.nameMeaning}.
    Gabungkan elemen kosmik, fantasi, dan simbolis yang mewakili zodiak dan arti nama mereka secara halus, serta merefleksikan jenis kelamin dan usia mereka.
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
