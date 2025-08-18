
import { NextResponse } from 'next/server';

function toTitleCase(str: string) {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nikData, pas_photo_url } = body;

    if (!nikData || !pas_photo_url) {
      return NextResponse.json({ error: 'NIK data and photo URL are required.' }, { status: 400 });
    }
    
    // Format tanggal lahir, contoh: "Sukabumi, 19-09-1984"
    const ttlParts = nikData.data.tempat_lahir?.split(', ') ?? [];
    const placeOfBirth = ttlParts.length > 1 ? toTitleCase(ttlParts[0]) : toTitleCase(nikData.data.kabupaten || nikData.data.kota || '');
    let dateOfBirth = '';
    
    if (ttlParts.length > 1) {
        // Coba parsing tanggal dari format "DD MMMM YYYY" (Indonesian)
        const dateString = ttlParts.slice(1).join(' ');
        const monthNames = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
        const dateParts = dateString.split(' ');
        const day = parseInt(dateParts[0], 10);
        const monthIndex = monthNames.indexOf(dateParts[1]?.toLowerCase());
        const year = parseInt(dateParts[2], 10);

        if (!isNaN(day) && monthIndex !== -1 && !isNaN(year)) {
            const formattedDay = String(day).padStart(2, '0');
            const formattedMonth = String(monthIndex + 1).padStart(2, '0');
            dateOfBirth = `${formattedDay}-${formattedMonth}-${year}`;
        }
    }
    
    const formattedTtl = dateOfBirth ? `${placeOfBirth}, ${dateOfBirth}` : placeOfBirth;
    const formattedKelamin = toTitleCase(nikData.data.kelamin || '');


    const ektpApiUrl = `https://api.siputzx.my.id/api/m/ektp`;

    const requestBody = {
        provinsi: nikData.data.provinsi || '',
        kota: nikData.data.kabupaten || nikData.data.kota || '',
        nik: nikData.nik || '',
        nama: nikData.data.nama || '',
        ttl: formattedTtl,
        jenis_kelamin: formattedKelamin,
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
    
    const contentType = ektpResponse.headers.get('content-type');
    
    if (!ektpResponse.ok || (contentType && !contentType.startsWith('image/'))) {
        const errorText = await ektpResponse.text();
        console.error("e-KTP API error:", errorText);
        let errorMessage = "Failed to generate e-KTP image from external API.";
        try {
            // Try to parse error as JSON
            const errorJson = JSON.parse(errorText);
            errorMessage = `e-KTP API error: ${errorJson.error || errorJson.message || 'Unknown error'}`;
        } catch (e) {
            // If parsing fails, use the raw text
             errorMessage = `e-KTP API error: ${errorText}`;
        }
         return NextResponse.json({ error: errorMessage }, { status: ektpResponse.status });
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
