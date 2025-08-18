"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type GetFunFactsOutput } from "@/ai/flows/fun-fact-flow";
import { Brain, Heart, Wind, Dna, Shield, Filter, Utensils, Eye, Moon, Dumbbell, Activity } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface FunFactsProps {
  data: GetFunFactsOutput | null;
  isLoading: boolean;
}

const factCategories = [
  { key: "basicInfo", title: "Informasi Dasar", icon: Activity, unit: '' },
  { key: "respiratory", title: "Pernapasan", icon: Wind, unit: 'x' },
  { key: "cardiovascular", title: "Kardiovaskular", icon: Heart, unit: 'x' },
  { key: "neurological", title: "Saraf", icon: Brain, unit: 'x' },
  { key: "digestive", title: "Pencernaan", icon: Utensils, unit: 'x' },
  { key: "detoxification", title: "Detoksifikasi", icon: Filter, unit: 'L' },
  { key: "immuneSystem", title: "Sistem Imun", icon: Shield, unit: 'x' },
  { key: "cellularActivity", title: "Aktivitas Seluler", icon: Dna, unit: 'x' },
  { key: "sensory", title: "Indra", icon: Eye, unit: 'x' },
  { key: "hormonal", title: "Hormon", icon: Moon, unit: 'x' },
  { key: "physical", title: "Aktivitas Fisik", icon: Dumbbell, unit: 'x' },
];

const formatKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/Total$/, '')
    .trim();
};

const formatValue = (value: number) => {
    if (value > 1e12) return `${(value / 1e12).toFixed(2)} Triliun`;
    if (value > 1e9) return `${(value / 1e9).toFixed(2)} Miliar`;
    if (value > 1e6) return `${(value / 1e6).toFixed(2)} Juta`;
    if (value > 1e3) return `${(value / 1e3).toFixed(2)} Ribu`;
    return value.toLocaleString('id-ID');
}


export function FunFacts({ data, isLoading }: FunFactsProps) {

  if (isLoading) {
    return (
        <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    )
  }

  if (!data?.data) {
    return <p className="text-sm text-muted-foreground">Fakta menarik tidak tersedia.</p>;
  }

  const { data: funFacts } = data;

  return (
    <Accordion type="single" collapsible className="w-full">
      {factCategories.map(({ key, title, icon: Icon }) => {
        const categoryData = funFacts[key as keyof typeof funFacts];
        if (!categoryData || typeof categoryData !== 'object') return null;

        const entries = Object.entries(categoryData);
        if (entries.length === 0) return null;

        return (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="font-semibold">{title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-4">
                {entries.map(([factKey, value]) => (
                  <li key={factKey} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{formatKey(factKey)}</span>
                    <span className="font-medium">{formatValue(value as number)}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
