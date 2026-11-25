// Fonts recommended for the phonetic alphabet trainings.
// They cover a clean default, a serif, a monospace and rounded alternatives.

export const RECOMMENDED_FONT_NAMES = [
  'Inter', // Clean default for reading and practice
  'Roboto', // Neutral sans serif with wide language coverage
  'Lora', // Readable serif for longer text
  'JetBrains Mono', // Monospace for code words and spelling drills
  'Nunito', // Rounded sans serif with soft shapes
  'Space Grotesk', // Distinct sans serif for headings
  'DM Sans', // Modern geometric sans serif
  'Outfit', // Geometric display sans serif
  'Work Sans', // Versatile sans serif for UI text
] as const;

export type RecommendedFontName = (typeof RECOMMENDED_FONT_NAMES)[number];

export const isRecommendedFont = (fontName: string): boolean => {
  return RECOMMENDED_FONT_NAMES.includes(fontName as RecommendedFontName);
};
