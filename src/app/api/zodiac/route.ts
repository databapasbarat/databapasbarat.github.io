import { NextResponse } from 'next/server';
import { getZodiacSign } from '@/ai/flows/zodiac-flow';

export async function POST(request: Request) {
  try {
    const { name, birthdate } = await request.json();

    if (!name || !birthdate) {
      return NextResponse.json({ error: 'Name and birthdate are required.' }, { status: 400 });
    }

    // Call external API to get zodiac and shio
    const url = `https://api.siputzx.my.id/api/primbon/zodiac?tgl=${birthdate.split('-')[2]}&bln=${birthdate.split('-')[1]}&thn=${birthdate.split('-')[0]}`;
    
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();

    if (!apiResponse.ok || apiData.status === false) {
      return NextResponse.json({ error: apiData.message || 'Failed to get data from zodiac API.' }, { status: apiResponse.status });
    }

    const { zodiac, shio } = apiData.data;

    // Call Genkit flow to get personality
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
