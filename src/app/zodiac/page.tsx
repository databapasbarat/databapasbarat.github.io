import { Landmark, Sparkles } from "lucide-react";
import Link from "next/link";
import { ZodiacClient } from "@/components/zodiac-client";

export default function ZodiacPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
           <Link href="/" className="mr-4 flex items-center">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="ml-2 font-bold font-headline">NIK & Zodiac Check</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Zodiac by Date</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <ZodiacClient />
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by an expert AI engineer.
          </p>
        </div>
      </footer>
    </div>
  );
}
