export type ImageType = 'environment' | 'product' | 'generated' | 'asset';

export interface ImageMetadata {
  id: string;
  type: ImageType;
  dataUrl: string;           // For display in Excalidraw
  highResDataUrl: string;    // Original high-res for API calls
  excalidrawFileId: string;  // File ID in Excalidraw's file system
  excalidrawElementId: string; // Element ID on canvas
  addedAt: number;
  width: number;
  height: number;
  isLocked: boolean;
  name?: string;
}

export interface GenerationHistoryItem {
  id: string;
  generatedImageUrl: string;
  prompt: string;
  timestamp: number;
  sourceImages: {
    environmentId: string;
    productIds: string[];
  };
}

export interface GenerateImageParams {
  prompt?: string;
  preserveEnvironment?: boolean;
}

export interface CanvasWorkspaceState {
  hasEnvironment: boolean;
  showInitialDialog: boolean;
  imageMetadata: Map<string, ImageMetadata>;
  isGenerating: boolean;
  generationHistory: GenerationHistoryItem[];
  excalidrawAPI: any | null; // ExcalidrawImperativeAPI type
}
