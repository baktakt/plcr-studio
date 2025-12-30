import { useState, useCallback } from 'react';
import type { ImageMetadata, ImageType } from '@/types/canvas';

export function useImageMetadata() {
  const [imageMetadata, setImageMetadata] = useState<Map<string, ImageMetadata>>(
    new Map()
  );

  // Add or update image metadata
  const addImage = useCallback((metadata: ImageMetadata) => {
    setImageMetadata((prev) => {
      const newMap = new Map(prev);

      // First image logic: If this is the first image (excluding generated images),
      // automatically mark it as 'environment' unless it's already marked as 'generated'
      const existingImages = Array.from(prev.values());
      const hasEnvironmentOrProduct = existingImages.some(
        (img) => img.type === 'environment' || img.type === 'product'
      );

      // If no environment or product images exist yet, and this isn't a generated image,
      // mark it as environment
      if (!hasEnvironmentOrProduct && metadata.type !== 'generated') {
        metadata = { ...metadata, type: 'environment' };
      }

      newMap.set(metadata.id, metadata);
      return newMap;
    });
  }, []);

  // Remove image by metadata ID
  const removeImageById = useCallback((id: string) => {
    setImageMetadata((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  // Remove image by Excalidraw element ID
  const removeImageByElementId = useCallback((elementId: string) => {
    setImageMetadata((prev) => {
      const newMap = new Map(prev);
      for (const [id, metadata] of newMap.entries()) {
        if (metadata.excalidrawElementId === elementId) {
          newMap.delete(id);
          break;
        }
      }
      return newMap;
    });
  }, []);

  // Update image type by Excalidraw element ID
  const updateImageType = useCallback((elementId: string, newType: ImageType) => {
    setImageMetadata((prev) => {
      const newMap = new Map(prev);
      for (const [id, metadata] of newMap.entries()) {
        if (metadata.excalidrawElementId === elementId) {
          newMap.set(id, { ...metadata, type: newType });
          break;
        }
      }
      return newMap;
    });
  }, []);

  // Get image by metadata ID
  const getImage = useCallback(
    (id: string): ImageMetadata | undefined => {
      return imageMetadata.get(id);
    },
    [imageMetadata]
  );

  // Get image by Excalidraw element ID
  const getImageByElementId = useCallback(
    (elementId: string): ImageMetadata | undefined => {
      for (const metadata of imageMetadata.values()) {
        if (metadata.excalidrawElementId === elementId) {
          return metadata;
        }
      }
      return undefined;
    },
    [imageMetadata]
  );

  // Get all images as array
  const getAllImages = useCallback((): ImageMetadata[] => {
    return Array.from(imageMetadata.values());
  }, [imageMetadata]);

  // Get images by type
  const getImagesByType = useCallback(
    (type: ImageType): ImageMetadata[] => {
      return Array.from(imageMetadata.values()).filter(
        (img) => img.type === type
      );
    },
    [imageMetadata]
  );

  // Identify environment image using heuristic
  const getEnvironmentImage = useCallback((): ImageMetadata | undefined => {
    const images = Array.from(imageMetadata.values());

    // 1. Explicit environment type
    const explicit = images.find((img) => img.type === 'environment');
    if (explicit) return explicit;

    // 2. Locked image (should be environment)
    const locked = images.find((img) => img.isLocked);
    if (locked) return locked;

    // 3. Largest image by area (fallback heuristic)
    if (images.length === 0) return undefined;

    return images.reduce((largest, current) => {
      const largestArea = largest.width * largest.height;
      const currentArea = current.width * current.height;
      return currentArea > largestArea ? current : largest;
    });
  }, [imageMetadata]);

  // Get all product images (only images in Product frame)
  const getProductImages = useCallback((): ImageMetadata[] => {
    return Array.from(imageMetadata.values()).filter(
      (img) => img.type === 'product'
    );
  }, [imageMetadata]);

  // Get all asset images (loose images outside frames)
  const getAssetImages = useCallback((): ImageMetadata[] => {
    return Array.from(imageMetadata.values()).filter(
      (img) => img.type === 'asset'
    );
  }, [imageMetadata]);

  // Get all generated images
  const getGeneratedImages = useCallback((): ImageMetadata[] => {
    return Array.from(imageMetadata.values()).filter(
      (img) => img.type === 'generated'
    );
  }, [imageMetadata]);

  // Clear all images
  const clearAll = useCallback(() => {
    setImageMetadata(new Map());
  }, []);

  // Set entire metadata map (useful for bulk updates)
  const setAllImages = useCallback((images: Map<string, ImageMetadata>) => {
    setImageMetadata(images);
  }, []);

  return {
    // State
    imageMetadata,

    // Add/Remove operations
    addImage,
    removeImageById,
    removeImageByElementId,

    // Update operations
    updateImageType,

    // Get operations
    getImage,
    getImageByElementId,
    getAllImages,
    getImagesByType,

    // Specialized getters
    getEnvironmentImage,
    getProductImages,
    getGeneratedImages,
    getAssetImages,

    // Bulk operations
    clearAll,
    setAllImages,
  };
}
