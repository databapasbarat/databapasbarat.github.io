"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, User, Calendar, AlertCircle } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getZodiacSign } from "@/ai/flows/zodiac-flow";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  birthdate: z.string().min(1, {message: "Birthdate is required."}),
});

interface ZodiacData {
  zodiac: string;
  shio: string;
  personality: string;
}

export function ZodiacClient() {
  const [zodiacData, setZodiacData] = useState<ZodiacData | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", birthdate: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsChecking(true);
    setError(null);
    setZodiacData(null);

    try {
      const response = await fetch('/api/zodiac', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to get zodiac data.");
      }

      setZodiacData(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data from the API!");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Check Your Zodiac & Shio</CardTitle>
          <CardDescription>
            Enter your name and birthdate to find out your zodiac sign, shio, and personality traits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. John Doe"
                        {...field}
                        disabled={isChecking}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
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
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Check Zodiac
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isChecking && (
        <Card>
          <CardHeader>
             <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {zodiacData && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Zodiac Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Zodiac</h3>
              <p className="text-muted-foreground">{zodiacData.zodiac}</p>
            </div>
            <div>
              <h3 className="font-semibold">Shio</h3>
              <p className="text-muted-foreground">{zodiacData.shio}</p>
            </div>
             <div>
              <h3 className="font-semibold">AI Personality Analysis</h3>
              <p className="text-muted-foreground">{zodiacData.personality}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
