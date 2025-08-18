import { NextResponse } from 'next/server';
import { generateImage } from '@/ai/flows/generate-image-flow';

export async function POST(request: Request) {
  try {
    const { name, zodiac, zodiacDescription, nameMeaning, gender, age } = await request.json();

    if (!name || !zodiac || !zodiacDescription || !nameMeaning || !gender || !age) {
      return NextResponse.json({ error: 'Name, zodiac, zodiac description, name meaning, gender, and age are required.' }, { status: 400 });
    }
    
    const result = await generateImage({ name, zodiac, zodiacDescription, nameMeaning, gender, age });

    return NextResponse.json({ imageUrl: result.imageUrl });

  } catch (error) {
    console.error('Failed to process image generation request:', error);
    return NextResponse.json({ error: 'Failed to generate image.' }, { status: 500 });
  }
}
