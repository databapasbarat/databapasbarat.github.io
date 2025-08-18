import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nik = searchParams.get('nik');

  if (!nik || typeof nik !== 'string' || !/^\d{16}$/.test(nik)) {
    return NextResponse.json({ error: 'Invalid NIK provided. It must be 16 digits.' }, { status: 400 });
  }

  const url = `https://api.siputzx.my.id/api/tools/nik-checker?nik=${encodeURIComponent(nik)}`;

  try {
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
      },
      cache: 'no-store',
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json({ error: errorJson.message || 'API Error' }, { status: apiResponse.status });
      } catch (e) {
        return NextResponse.json({ error: `API error: ${apiResponse.status}` }, { status: apiResponse.status });
      }
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch NIK data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from the external API.' }, { status: 500 });
  }
}
