/**
 * Prompt Optimizer v1
 * Simple prompt optimization for image generation requests
 */

export interface PromptOptimizationResult {
  optimized: string;
  notes: string[];
}

const QUALITY_SUFFIX =
  "photorealistic, high detail, accurate proportions, clean background, no text, no watermark";

/**
 * Optimizes a user prompt for better image generation results
 * @param input - The original user prompt
 * @returns Optimized prompt and notes about changes made
 */
export function optimizePrompt(input: string): PromptOptimizationResult {
  const notes: string[] = [];

  // Handle empty input
  if (!input || input.trim().length === 0) {
    return {
      optimized: "",
      notes: ["Prompt is empty"],
    };
  }

  // Step 1: Trim whitespace and collapse multiple spaces/newlines
  let optimized = input.trim();
  const originalLength = optimized.length;

  // Collapse multiple spaces into single space
  optimized = optimized.replace(/\s+/g, " ");

  if (optimized.length < originalLength) {
    notes.push("Removed extra whitespace");
  }

  // Step 2: Append quality suffix if not already present
  const lowerOptimized = optimized.toLowerCase();
  const qualityKeywords = ["photorealistic", "high detail", "accurate proportions"];
  const hasQualityTerms = qualityKeywords.some((keyword) =>
    lowerOptimized.includes(keyword.toLowerCase())
  );

  if (!hasQualityTerms) {
    // Add quality suffix with proper punctuation
    const needsComma = !optimized.endsWith(",") && !optimized.endsWith(".");
    optimized = `${optimized}${needsComma ? ", " : " "}${QUALITY_SUFFIX}`;
    notes.push("Added quality enhancement suffix");
  }

  return {
    optimized,
    notes,
  };
}

/**
 * Get skip preference from localStorage
 */
export function getSkipOptimizerPreference(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("plcr-skip-prompt-optimizer");
  return stored === "true";
}

/**
 * Set skip preference in localStorage
 */
export function setSkipOptimizerPreference(skip: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("plcr-skip-prompt-optimizer", skip ? "true" : "false");
}
