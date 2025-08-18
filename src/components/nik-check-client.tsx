"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Fingerprint, Files, AlertCircle, Sparkles, Camera, MapPin, Cake, BookText, BrainCircuit, CheckCircle, XCircle, Star } from "lucide-react";
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
import { getZodiacSign, type GetZodiacSignOutput } from "@/ai/flows/zodiac-flow";
import { getNameMeaning } from "@/ai/flows/name-meaning-flow";
import { getFunFacts, type GetFunFactsOutput } from "@/ai/flows/fun-fact-flow";
import { BirthdayCountdown } from "@/components/birthday-countdown";
import { FunFacts } from "@/components/fun-facts";

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
        tempat_lahir: string;
        zodiak: string;
        shio: string;
        ultah_mendatang: string;
        kelamin: string;
        usia: string;
        koordinat?: {
            lat: string;
            lon: string;
        };
        [key: string]: any;
    };
}

interface ApiResponse {
  status: boolean;
  data: {
    nik: string;
    status: string;
    data: NikData["data"];
  };
  message?: string;
}

interface ZodiacData {
  zodiac: string;
  analysis: GetZodiacSignOutput;
}

interface NameMeaningData {
    nama: string;
    arti: string;
    catatan?: string;
}

export function NikCheckClient() {
  const [nikData, setNikData] = useState<NikData | null>(null);
  const [zodiacData, setZodiacData] = useState<ZodiacData | null>(null);
  const [nameMeaningData, setNameMeaningData] = useState<NameMeaningData | null>(null);
  const [funFactsData, setFunFactsData] = useState<GetFunFactsOutput | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCheckingZodiac, setIsCheckingZodiac] = useState(false);
  const [isCheckingNameMeaning, setIsCheckingNameMeaning] = useState(false);
  const [isCheckingFunFacts, setIsCheckingFunFacts] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zodiacError, setZodiacError] = useState<string | null>(null);
  const [nameMeaningError, setNameMeaningError] = useState<string | null>(null);
  const [funFactsError, setFunFactsError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nik: "" },
  });
  
  useEffect(() => {
    const fetchAuxData = async () => {
      if (!nikData) return;

      setIsCheckingZodiac(true);
      setZodiacError(null);
      setIsCheckingNameMeaning(true);
      setNameMeaningError(null);
      setIsCheckingFunFacts(true);
      setFunFactsError(null);

      const zodiacPromise = getZodiacSign({
        name: nikData.data.nama,
        zodiac: nikData.data.zodiak,
        gender: nikData.data.kelamin,
        age: nikData.data.usia
      }).catch(e => {
        console.error("Zodiac check failed:", e);
        setZodiacError(e.message || "Gagal memuat data zodiak.");
        return null;
      });

      const nameMeaningPromise = getNameMeaning({ name: nikData.data.nama }).catch(e => {
        console.error("Name meaning check failed:", e);
        setNameMeaningError(e.message || "Gagal memuat data arti nama.");
        return null;
      });

      const funFactsPromise = getFunFacts({ birthDate: nikData.data.tempat_lahir }).catch(e => {
        console.error("Fun facts check failed:", e);
        setFunFactsError(e.message || "Gagal memuat data fakta menarik.");
        return null;
      })

      const [zodiacResult, nameMeaningResult, funFactsResult] = await Promise.all([zodiacPromise, nameMeaningPromise, funFactsPromise]);

      if (zodiacResult) {
        setZodiacData({
          zodiac: nikData.data.zodiak,
          analysis: zodiacResult,
        });
      } else {
        setZodiacData(null);
      }
      setIsCheckingZodiac(false);

      if (nameMeaningResult) {
        setNameMeaningData(nameMeaningResult);
      } else {
        setNameMeaningData(null);
      }
      setIsCheckingNameMeaning(false);

      if (funFactsResult && funFactsResult.status) {
          setFunFactsData(funFactsResult);
      } else {
          setFunFactsData(null);
          setFunFactsError(funFactsResult?.error || "Data fakta menarik tidak ditemukan.");
      }
      setIsCheckingFunFacts(false);
    };
    
    fetchAuxData();
  }, [nikData]);

  useEffect(() => {
    if (zodiacData && nikData && nameMeaningData) {
      const fetchImage = async () => {
        setIsGeneratingImage(true);
        setGeneratedImage(null);
        setError(null);
        try {
          const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: nikData.data.nama,
              zodiac: zodiacData.zodiac,
              zodiacDescription: zodiacData.analysis.description,
              nameMeaning: nameMeaningData.arti,
              gender: nikData.data.kelamin,
              age: nikData.data.usia,
              shio: nikData.data.shio,
            }),
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Failed to generate image.");
          }
          setGeneratedImage(result.imageUrl);
        } catch (e: any) {
          console.error("Image generation failed:", e);
          setError(`Image Generation Failed: ${e.message}`);
          setGeneratedImage(null);
        } finally {
          setIsGeneratingImage(false);
        }
      };
      fetchImage();
    }
  }, [zodiacData, nikData, nameMeaningData]);
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsChecking(true);
    setError(null);
    setZodiacError(null);
    setNameMeaningError(null);
    setFunFactsError(null);
    setNikData(null);
    setZodiacData(null);
    setNameMeaningData(null);
    setFunFactsData(null);
    setGeneratedImage(null);

    try {
      const response = await fetch(`/api/check-nik?nik=${values.nik}`);
      const result: ApiResponse & { error?: string } = await response.json();

      if (!response.ok || result.status === false || result.data.status !== 'success') {
        throw new Error(result.message || result.error || "Data tidak ditemukan!");
      }

      const extractedData: NikData = {
          nik: result.data.nik,
          data: result.data.data,
      };

      setNikData(extractedData);
      
    } catch (err: any) {
      setError(err.message || "Gagal mengambil data dari API!");
      setNikData(null);
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
    'nik', 'nama', 'kelamin', 'tempat_lahir', 'usia', 'zodiak', 'shio', 'provinsi', 
    'kabupaten', 'kecamatan', 'kelurahan'
  ];

  const renderZodiacAnalysis = () => {
    if (!zodiacData) return null;
    const { analysis } = zodiacData;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-primary">{analysis.title}</h3>
                <p className="text-sm text-muted-foreground">Analisis Kepribadian untuk Zodiak {zodiacData.zodiac}</p>
            </div>
            <p className="text-muted-foreground italic">"{analysis.description}"</p>
            
            <div>
                <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" />Kekuatan Kamu</h4>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {analysis.strengths.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>

            <div>
                <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><XCircle className="h-5 w-5 text-amber-500" />Tantangan Kecil</h4>
                 <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {analysis.weaknesses.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>

            <div>
                 <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400" />Saran Buat Kamu</h4>
                <p className="text-muted-foreground">{analysis.advice}</p>
            </div>
        </div>
    );
  };

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
                        <Sparkles className="h-5 w-5 text-primary"/>
                        <CardTitle className="font-headline">Analisis Zodiak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isCheckingZodiac ? (
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/2 mt-4" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        ) : zodiacData ? (
                            renderZodiacAnalysis()
                        ) : (
                             <p className="text-sm text-muted-foreground">{zodiacError || "Data zodiak tidak tersedia."}</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <BookText className="h-5 w-5 text-primary"/>
                        <CardTitle className="font-headline">Arti Nama</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isCheckingNameMeaning ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-full mt-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ) : nameMeaningData ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">Nama</h3>
                                    <p className="text-muted-foreground">{nameMeaningData.nama}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Arti</h3>
                                    <p className="text-muted-foreground">{nameMeaningData.arti}</p>
                                </div>
                                {nameMeaningData.catatan && (
                                    <div>
                                        <h3 className="font-semibold">Catatan</h3>
                                        <p className="text-muted-foreground">{nameMeaningData.catatan}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                             <p className="text-sm text-muted-foreground">{nameMeaningError || "Data arti nama tidak tersedia."}</p>
                        )}
                    </CardContent>
                </Card>

                 {nikData.data.tempat_lahir && (
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                      <Cake className="h-5 w-5 text-primary" />
                      <CardTitle className="font-headline">Ulang Tahun Berikutnya</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BirthdayCountdown birthDateString={nikData.data.tempat_lahir} />
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

              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline">Fakta Menarik Seumur Hidup</CardTitle>
                </CardHeader>
                <CardContent>
                    <FunFacts data={funFactsData} isLoading={isCheckingFunFacts} />
                    {funFactsError && !isCheckingFunFacts && <p className="text-sm text-destructive mt-2">{funFactsError}</p>}
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
            </div>
        </div>
      )}
    </div>
  );
}
