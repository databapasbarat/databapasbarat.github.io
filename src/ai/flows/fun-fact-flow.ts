'use server';

/**
 * @fileOverview Gets live fun facts based on a birthdate.
 *
 * - getFunFacts - A function that gets fun facts.
 * - GetFunFactsInput - The input type for the getFunFacts function.
 * - GetFunFactsOutput - The return type for the getFunFacts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFunFactsInputSchema = z.object({
  birthDate: z.string().describe("The person's birth date in 'DD MMMM YYYY' format (e.g., '15 Mei 1990')."),
});
export type GetFunFactsInput = z.infer<typeof GetFunFactsInputSchema>;

// Dynamically create a Zod schema for the deeply nested API response.
const createSubSchema = (keys: string[]) => {
    const shape: {[key: string]: z.ZodNumber} = {};
    keys.forEach(key => {
        shape[key] = z.number();
    });
    return z.object(shape).optional();
};

const ComparisonSchema = z.object({
  lifeExpectancy: z.object({
    world: z.number(),
    percentageLived: z.number(),
  }).optional(),
  breathingProgress: z.object({
    averagePersonLifetime: z.number(),
    yourProgress: z.number(),
    percentageComplete: z.number(),
  }).optional(),
  heartbeatProgress: z.object({
    averagePersonLifetime: z.number(),
    yourProgress: z.number(),
    percentageComplete: z.number(),
  }).optional(),
}).optional();

const AmazingFactsSchema = z.object({
  totalCellsInBody: z.number().optional(),
  bacterialCellsInBody: z.number().optional(),
  dnaLengthTotal: z.number().optional(),
  informationProcessedByBrain: z.number().optional(),
  heatGenerated: z.number().optional(),
  waterTurnover: z.number().optional(),
  electricalImpulses: z.number().optional(),
  chemicalReactionsPerSecond: z.number().optional(),
}).optional();


const GetFunFactsOutputSchema = z.object({
  status: z.boolean(),
  data: z.object({
    birthDate: z.string(),
    calculatedAt: z.string(),
    medicalDisclaimer: z.string(),
    basicInfo: createSubSchema(["ageInYears", "ageInMonths", "ageInWeeks", "ageInDays", "ageInHours", "ageInMinutes", "ageInSeconds"]),
    respiratory: createSubSchema(["totalBreaths", "oxygenLitersConsumed", "carbonDioxideLitersProduced", "airLitersInhaled"]),
    cardiovascular: createSubSchema(["heartBeatsTotal", "bloodLitersPumped", "bloodCellReplacements", "distanceBloodTraveled", "heartWorkEnergy"]),
    neurological: createSubSchema(["synapticTransmissionsTotal", "brainEnergyConsumed", "neurotransmitterReleases", "brainOxygenConsumed", "memoryConsolidationCycles", "brainElectricalActivity"]),
    digestive: createSubSchema(["salivaLitersProduced", "stomachAcidLitersProduced", "digestiveJuiceTotalLiters", "peristalsisWavesTotal", "digestiveEnzymeActions"]),
    detoxification: createSubSchema(["bloodLitersFiltered", "urineLitersProduced", "liverDetoxProcesses", "sweatLitersProduced", "toxinsFiltered", "wasteProductsEliminated"]),
    immuneSystem: createSubSchema(["whiteCellsProduced", "antibodiesGenerated", "skinCellReplacements", "pathogensDefeated", "woundHealingCycles", "immuneMemoryCellsCreated"]),
    cellularActivity: createSubSchema(["cellsReplaced", "atpMoleculesProduced", "proteinSynthesis", "enzymaticReactions", "dnaRepairs", "cellularRespirations"]),
    sensory: createSubSchema(["eyeBlinks", "eyeMovements", "tasteExperiences", "smellsDetected", "touchSensations", "soundsProcessed"]),
    hormonal: createSubSchema(["hormonalCyclesCompleted", "insulinReleases", "stressResponseActivations", "circadianRhythms", "growthHormonePulses", "metabolicAdjustments"]),
    physical: createSubSchema(["muscleContractions", "stepsEstimated", "caloriesBurned", "jointMovements", "postureAdjustments", "balanceCorrections"]),
    comparison: ComparisonSchema,
    amazingFacts: AmazingFactsSchema,
  }).optional(),
  error: z.string().optional(),
});
export type GetFunFactsOutput = z.infer<typeof GetFunFactsOutputSchema>;


const monthMap: { [key: string]: string } = {
  'januari': '01',
  'februari': '02',
  'maret': '03',
  'april': '04',
  'mei': '05',
  'juni': '06',
  'juli': '07',
  'agustus': '08',
  'september': '09',
  'oktober': '10',
  'november': '11',
  'desember': '12',
};

// Helper function to parse date string "DD MMMM YYYY" in Indonesian
const parseAndFormatDate = (dateString: string): string | null => {
    // Example input: "Bandung, 15 Mei 1990" or "15 Mei 1990"
    const datePart = dateString.includes(',') ? dateString.split(',')[1].trim() : dateString.trim();
    const parts = datePart.split(' ');
    if (parts.length < 3) return null;

    const day = parts[0];
    const month = monthMap[parts[1].toLowerCase()];
    const year = parts[2];

    if (!day || !month || !year) return null;

    return `${year}-${month}-${day.padStart(2, '0')}`;
};

const getFunFactsFlow = ai.defineFlow(
  {
    name: 'getFunFactsFlow',
    inputSchema: GetFunFactsInputSchema,
    outputSchema: GetFunFactsOutputSchema,
  },
  async ({ birthDate }) => {
    const formattedDate = parseAndFormatDate(birthDate);

    if (!formattedDate) {
        return { status: false, error: 'Invalid birth date format.' };
    }
    
    const url = `https://api.siputzx.my.id/api/fun/livefunfact?birthdate=${formattedDate}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        return { status: false, error: `API request failed: ${errorText}` };
      }
      const data = await response.json();
      return data;

    } catch (error: any) {
      console.error('Error fetching fun facts:', error);
      return { status: false, error: error.message || 'Failed to fetch data from external API.' };
    }
  }
);


export async function getFunFacts(input: GetFunFactsInput): Promise<GetFunFactsOutput> {
  return getFunFactsFlow(input);
}
