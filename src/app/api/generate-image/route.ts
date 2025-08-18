import { NextResponse } from 'next/server';
import { generateImage } from '@/ai/flows/generate-image-flow';

export async function POST(request: Request) {
  try {
    const { name, zodiac, zodiacDescription, nameMeaning, gender, age, shio } = await request.json();

    if (!name || !zodiac || !zodiacDescription || !nameMeaning || !gender || !age || !shio) {
      return NextResponse.json({ error: 'Name, zodiac, zodiac description, name meaning, gender, age, and shio are required.' }, { status: 400 });
    }
    
    const result = await generateImage({ name, zodiac, zodiacDescription, nameMeaning, gender, age, shio });

    return NextResponse.json({ imageUrl: result.imageUrl });

  } catch (error) {
    console.error('Failed to process image generation request:', error);
    return NextResponse.json({ error: 'Failed to generate image.' }, { status: 500 });
  }
}
