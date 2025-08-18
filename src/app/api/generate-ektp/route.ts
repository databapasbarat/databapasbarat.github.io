
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nikData, pas_photo_url } = body;

    if (!nikData || !pas_photo_url) {
      return NextResponse.json({ error: 'NIK data and photo URL are required.' }, { status: 400 });
    }

    const ektpApiUrl = `https://api.siputzx.my.id/api/m/ektp`;

    const requestBody = {
        provinsi: nikData.data.provinsi || '',
        kota: nikData.data.kabupaten || nikData.data.kota || '',
        nik: nikData.nik || '',
        nama: nikData.data.nama || '',
        ttl: nikData.data.tempat_lahir ? `${nikData.data.tempat_lahir.split(',')[0]}, ${new Date(nikData.data.tempat_lahir.split(',')[1]).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}` : '',
        jenis_kelamin: nikData.data.kelamin || '',
        golongan_darah: '-',
        alamat: nikData.data.alamat || '',
        'rt/rw': '-',
        'kel/desa': nikData.data.kelurahan || '',
        kecamatan: nikData.data.kecamatan || '',
        agama: '-',
        status: '-',
        pekerjaan: '-',
        kewarganegaraan: 'WNI',
        masa_berlaku: 'SEUMUR HIDUP',
        terbuat: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
        pas_photo: pas_photo_url
    };
    
    // The API returns the image directly, so we need to fetch it and return it as a data URI
    const ektpResponse = await fetch(ektpApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'image/*'
        },
        body: JSON.stringify(requestBody),
    });
    
    if (!ektpResponse.ok) {
        const errorText = await ektpResponse.text();
        console.error("e-KTP API error:", errorText);
        // If the content type is not an image, it's likely a JSON/text error from the API
        if (ektpResponse.headers.get('content-type')?.includes('image')) {
            throw new Error('Failed to generate e-KTP image from external API.');
        } else {
             throw new Error(`e-KTP API error: ${errorText}`);
        }
    }
    
    const contentType = ektpResponse.headers.get('content-type');
    
    // Double check if the content type is not an image
    if (contentType && !contentType.startsWith('image/')) {
        const errorText = await ektpResponse.text();
        console.error("e-KTP API returned a non-image response:", errorText);
        throw new Error(`e-KTP API error: ${errorText}`);
    }
    
    const imageBuffer = await ektpResponse.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const responseContentType = contentType || 'image/jpeg';

    const dataUrl = `data:${responseContentType};base64,${imageBase64}`;

    return NextResponse.json({ imageUrl: dataUrl });

  } catch (error: any) {
    console.error('Failed to process e-KTP generation request:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate e-KTP image.' }, { status: 500 });
  }
}
