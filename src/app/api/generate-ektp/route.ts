
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nikData } = body;

    if (!nikData) {
      return NextResponse.json({ error: 'NIK data is required.' }, { status: 400 });
    }

    // Use a placeholder image as the pas_photo
    const pas_photo_url = 'https://placehold.co/300x400.png';
    
    // Construct the query parameters from nikData, providing empty strings as fallbacks
    const params = new URLSearchParams({
        provinsi: nikData.data.provinsi || '',
        kota: nikData.data.kabupaten || nikData.data.kota || '',
        nik: nikData.nik || '',
        nama: nikData.data.nama || '',
        ttl: nikData.data.tempat_lahir || '',
        jenis_kelamin: nikData.data.kelamin || '',
        golongan_darah: nikData.data.gol_darah || '-',
        alamat: nikData.data.alamat || '',
        'rt/rw': nikData.data.rt_rw || '-',
        'kel/desa': nikData.data.kelurahan || '',
        kecamatan: nikData.data.kecamatan || '',
        agama: nikData.data.agama || '-',
        status: nikData.data.status_perkawinan || '-',
        pekerjaan: nikData.data.pekerjaan || '-',
        kewarganegaraan: 'WNI',
        masa_berlaku: 'SEUMUR HIDUP',
        terbuat: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
        pas_photo: pas_photo_url
    });

    const ektpApiUrl = `https://api.siputzx.my.id/api/m/ektp?${params.toString()}`;

    // The API returns the image directly, so we need to fetch it and return it as a data URI
    const ektpResponse = await fetch(ektpApiUrl);

    if (!ektpResponse.ok) {
        const errorText = await ektpResponse.text();
        console.error("e-KTP API error:", errorText);
        throw new Error('Failed to generate e-KTP image from external API.');
    }
    
    const imageBuffer = await ektpResponse.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const contentType = ektpResponse.headers.get('content-type') || 'image/jpeg';

    const dataUrl = `data:${contentType};base64,${imageBase64}`;

    return NextResponse.json({ imageUrl: dataUrl });

  } catch (error: any) {
    console.error('Failed to process e-KTP generation request:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate e-KTP image.' }, { status: 500 });
  }
}
