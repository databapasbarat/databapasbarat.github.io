import { Landmark, Sparkles } from "lucide-react";
import Link from "next/link";
import { NikCheckClient } from "@/components/nik-check-client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 flex items-center">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="ml-2 font-bold font-headline">NIK & Zodiac Check</span>
          </div>
          <nav>
            <Button asChild variant="outline">
              <Link href="/zodiac">
                <Sparkles className="mr-2 h-4 w-4" />
                Zodiac by Date
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <NikCheckClient />
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
