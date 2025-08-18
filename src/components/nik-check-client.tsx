"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Fingerprint, Files, Database, FileText, AlertCircle, Sparkles, Camera, MapPin, BadgeCheck, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getZodiacSign } from "@/ai/flows/zodiac-flow";
import { BirthdayCountdown } from "@/components/birthday-countdown";

const formSchema = z.object({
  nik: z
    .string()
    .min(16, { message: "NIK must be 16 digits." })
    .max(16, { message: "NIK must be 16 digits." })
    .regex(/^[0-9]+$/, { message: "NIK must contain only numbers." }),
});

interface NikData {
    nik: string;
    data: {
        nama: string;
        zodiak: string;
        ultah_mendatang: string;
        koordinat?: {
            lat: string;
            lon: string;
        };
        [key: string]: any;
    };
    metadata: {
        [key: string]: any;
    };
    data_lhp: Record<string, any>[];
}

interface ApiResponse {
  status: boolean;
  data: {
    nik: string;
    status: string;
    data: NikData["data"];
    metadata: NikData["metadata"];
    data_lhp: NikData["data_lhp"];
  };
  message?: string;
}

interface ZodiacData {
  zodiac: string;
  personality: string;
}


export function NikCheckClient() {
  const [nikData, setNikData] = useState<NikData | null>(null);
  const [zodiacData, setZodiacData] = useState<ZodiacData | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [ektpImage, setEktpImage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCheckingZodiac, setIsCheckingZodiac] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingEktp, setIsGeneratingEktp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zodiacError, setZodiacError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nik: "" },
  });
  
  useEffect(() => {
    if (nikData) {
      const fetchEktpImage = async () => {
        setIsGeneratingEktp(true);
        setEktpImage(null);
        try {
          const response = await fetch('/api/generate-ektp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nikData }),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Failed to generate e-KTP image.");
          }
          setEktpImage(result.imageUrl);
        } catch (e) {
          console.error("e-KTP image generation failed:", e);
        } finally {
          setIsGeneratingEktp(false);
        }
      };
      fetchEktpImage();
    }
  }, [nikData]);

  useEffect(() => {
    if (zodiacData && nikData) {
      const fetchImage = async () => {
        setIsGeneratingImage(true);
        setGeneratedImage(null);
        try {
          const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: nikData.data.nama,
              zodiac: zodiacData.zodiac,
            }),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Failed to generate image.");
          }
          setGeneratedImage(result.imageUrl);
        } catch (e) {
          console.error("Image generation failed:", e);
          setGeneratedImage(null);
        } finally {
          setIsGeneratingImage(false);
        }
      };
      fetchImage();
    }
  }, [zodiacData, nikData]);


  const fetchZodiacData = async (name: string, zodiac: string) => {
      setIsCheckingZodiac(true);
      setZodiacError(null);
      try {
          if (!zodiac) {
            setZodiacError("Zodiak tidak tersedia dari data NIK.");
            setIsCheckingZodiac(false);
            return;
          }

          const personalityResult = await getZodiacSign({ name: name, zodiac });
          setZodiacData({
              zodiac,
              personality: personalityResult.personality,
          });

      } catch (e: any) {
          console.error("Zodiac check failed:", e);
          setZodiacError(e.message || "Gagal memuat data zodiak.");
          setZodiacData(null);
      } finally {
          setIsCheckingZodiac(false);
      }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsChecking(true);
    setIsCheckingZodiac(false);
    setIsGeneratingImage(false);
    setIsGeneratingEktp(false);
    setError(null);
    setZodiacError(null);
    setNikData(null);
    setZodiacData(null);
    setGeneratedImage(null);
    setEktpImage(null);

    try {
      const response = await fetch(`/api/check-nik?nik=${values.nik}`);
      const result: ApiResponse & { error?: string } = await response.json();

      if (!response.ok || result.status === false || result.data.status !== 'success') {
        throw new Error(result.message || result.error || "Data tidak ditemukan!");
      }

      const extractedData: NikData = {
          nik: result.data.nik,
          data: result.data.data,
          metadata: result.data.metadata,
          data_lhp: result.data.data_lhp,
      };

      setNikData(extractedData);
      
      if (extractedData.data.zodiak) {
        fetchZodiacData(extractedData.data.nama, extractedData.data.zodiak);
      } else {
        setIsCheckingZodiac(false);
        setZodiacError("Zodiak tidak tersedia dari data NIK.");
      }

    } catch (err: any) {
      setError(err.message || "Gagal mengambil data dari API!");
    } finally {
      setIsChecking(false);
    }
  }

  const renderTable = (data: Record<string, any>, keysToShow: string[]) => {
    const filteredData = keysToShow
      .map(key => {
        const value = data[key];
        // Only include the key if it exists in the data and is not null/undefined
        return value !== null && value !== undefined ? [key, value] : null;
      })
      .filter(Boolean) as [string, any][];

    return (
        <Table>
            <TableBody>
                {filteredData.map(([key, value]) => (
                    <TableRow key={key}>
                        <TableCell className="font-medium capitalize w-1/3">{key.replace(/_/g, ' ')}</TableCell>
                        <TableCell>{String(value)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
  };

  const ktpKeys = [
    'nik', 'nama', 'kelamin', 'tempat_lahir', 'usia', 'provinsi', 
    'kabupaten', 'kecamatan', 'kelurahan', 'alamat', 'tps'
  ];

  const metadataKeys = ['metode_pencarian', 'kode_wilayah', 'kategori_usia', 'jenis_wilayah', 'timestamp'];


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Cek Data NIK e-KTP</CardTitle>
          <CardDescription>
            Masukkan 16 digit Nomor Induk Kependudukan (NIK) Anda untuk melihat data kependudukan, zodiak, dan representasi gambar AI Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: 3202285909840005"
                        {...field}
                        disabled={isChecking}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isChecking} className="w-full sm:w-auto">
                {isChecking ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Fingerprint className="mr-2 h-4 w-4" />
                )}
                Cek NIK
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isChecking && (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <Skeleton className="h-6 w-1/4" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div className="flex" key={i}>
                              <Skeleton className="h-5 w-1/4" />
                              <Skeleton className="h-5 w-3/4 ml-4" />
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {nikData && (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Camera className="h-5 w-5 text-primary"/>
                        <CardTitle className="font-headline">Gambar Representasi AI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isGeneratingImage ? (
                            <Skeleton className="w-full aspect-square rounded-md" />
                        ) : generatedImage ? (
                            <Image src={generatedImage} alt="Generated Persona" width={512} height={512} className="w-full rounded-md" data-ai-hint="futuristic modern" />
                        ) : (
                             <div className="w-full aspect-square rounded-md bg-muted flex items-center justify-center">
                                <p className="text-sm text-muted-foreground text-center p-4">Gambar akan dibuat setelah data NIK dan Zodiak berhasil dimuat.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-primary"/>
                        <CardTitle className="font-headline">e-KTP Digital</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isGeneratingEktp ? (
                            <Skeleton className="w-full aspect-[85.6/53.98] rounded-md" />
                        ) : ektpImage ? (
                             <Image src={ektpImage} alt="Generated e-KTP" width={856} height={540} className="w-full rounded-md" data-ai-hint="id card" />
                        ) : (
                             <div className="w-full aspect-[85.6/53.98] rounded-md bg-muted flex items-center justify-center">
                                <p className="text-sm text-muted-foreground text-center p-4">e-KTP akan dibuat setelah data NIK berhasil dimuat.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary"/>
                        <CardTitle className="font-headline">Zodiak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isCheckingZodiac ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-full mt-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ) : zodiacData ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">Zodiak</h3>
                                    <p className="text-muted-foreground">{zodiacData.zodiac}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Analisis Kepribadian AI</h3>
                                    <p className="text-muted-foreground">{zodiacData.personality}</p>
                                </div>
                            </div>
                        ) : (
                             <p className="text-sm text-muted-foreground">{zodiacError || "Data zodiak tidak tersedia."}</p>
                        )}
                    </CardContent>
                </Card>
                 {nikData.data.ultah_mendatang && (
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                      <Cake className="h-5 w-5 text-primary" />
                      <CardTitle className="font-headline">Ulang Tahun Berikutnya</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BirthdayCountdown countdownText={nikData.data.ultah_mendatang} />
                    </CardContent>
                  </Card>
                )}
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Files className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline">Detail KTP</CardTitle>
                </CardHeader>
                <CardContent className="px-0 sm:px-6">
                  {renderTable({ ...nikData.data, nik: nikData.nik }, ktpKeys)}
                </CardContent>
              </Card>

              {nikData.data.koordinat?.lat && nikData.data.koordinat?.lon && (
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="font-headline">Peta Lokasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: 'var(--radius)' }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://maps.google.com/maps?q=${nikData.data.koordinat.lat},${nikData.data.koordinat.lon}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="px-0 sm:px-6">{renderTable(nikData.metadata, metadataKeys)}</CardContent>
              </Card>

              {nikData.data_lhp && nikData.data_lhp.length > 0 && (
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="font-headline">Data LHP</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 sm:px-6">{renderTable(nikData.data_lhp[0], Object.keys(nikData.data_lhp[0]))}</CardContent>
                </Card>
              )}
            </div>
        </div>
      )}
    </div>
  );
}
