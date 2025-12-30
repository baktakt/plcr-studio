"use client";

import { useState } from "react";

interface IteratePromptDialogProps {
  isOpen: boolean;
  onSubmit: (prompt: string) => void;
  onClose: () => void;
  isGenerating?: boolean;
}

export default function IteratePromptDialog({
  isOpen,
  onSubmit,
  onClose,
  isGenerating = false,
}: IteratePromptDialogProps) {
  const [prompt, setPrompt] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Iterate on Image
            </h2>
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none disabled:opacity-50"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            Describe what changes you want to make to this image:
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Make the lighting warmer, add more shadows, adjust the perspective..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            disabled={isGenerating}
          />

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isGenerating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
