import { NextResponse } from 'next/server';
import { getZodiacSign } from '@/ai/flows/zodiac-flow';

export async function POST(request: Request) {
  try {
    const { name, birthdate } = await request.json();

    if (!name || !birthdate) {
      return NextResponse.json({ error: 'Name and birthdate are required.' }, { status: 400 });
    }

    // Call external API to get zodiac and shio
    const zodiacShioUrl = `https://api.siputzx.my.id/api/primbon/zodiac?tgl=${birthdate.split('-')[2]}&bln=${birthdate.split('-')[1]}&thn=${birthdate.split('-')[0]}`;
    
    const zodiacShioResponse = await fetch(zodiacShioUrl);
    const zodiacShioData = await zodiacShioResponse.json();

    if (!zodiacShioResponse.ok || zodiacShioData.status === false) {
      return NextResponse.json({ error: zodiacShioData.message || 'Failed to get data from zodiac API.' }, { status: zodiacShioResponse.status });
    }

    const { zodiac, shio } = zodiacShioData.data;

    const personalityResult = await getZodiacSign({ name, zodiac, shio });

    return NextResponse.json({
      zodiac,
      shio,
      personality: personalityResult.personality,
    });

  } catch (error) {
    console.error('Failed to process zodiac request:', error);
    return NextResponse.json({ error: 'Failed to process your request.' }, { status: 500 });
  }
}
