"use client";

import { useState, useEffect } from "react";
import { setSkipOptimizerPreference } from "@/lib/promptOptimizer";

interface PromptPreviewModalProps {
  open: boolean;
  title: string;
  originalPrompt: string;
  optimizedPrompt: string;
  notes: string[];
  onCancel: () => void;
  onConfirm: (finalPrompt: string) => void;
}

export default function PromptPreviewModal({
  open,
  title,
  originalPrompt,
  optimizedPrompt,
  notes,
  onCancel,
  onConfirm,
}: PromptPreviewModalProps) {
  const [editedPrompt, setEditedPrompt] = useState(optimizedPrompt);
  const [skipNextTime, setSkipNextTime] = useState(false);

  // Update edited prompt when optimized prompt changes
  useEffect(() => {
    setEditedPrompt(optimizedPrompt);
  }, [optimizedPrompt]);

  if (!open) return null;

  const handleConfirm = () => {
    // Save skip preference if checkbox was checked
    if (skipNextTime) {
      setSkipOptimizerPreference(true);
    }
    onConfirm(editedPrompt);
  };

  const isEmpty = !editedPrompt.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Original Prompt Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Original Prompt
            </label>
            <textarea
              value={originalPrompt}
              readOnly
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none text-gray-700 bg-gray-50 cursor-default"
              placeholder="(empty)"
            />
          </div>

          {/* Optimized Prompt Section */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Optimized Prompt (editable)
            </label>
            <textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Edit the optimized prompt here..."
            />
          </div>

          {/* Optimization Notes */}
          {notes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Optimizations Applied:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                {notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skip Next Time Checkbox */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={skipNextTime}
                onChange={(e) => setSkipNextTime(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span>Skip next time (auto-optimize without preview)</span>
            </label>
          </div>

          {/* Empty Prompt Warning */}
          {isEmpty && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ The prompt is empty. Please add a description before
                continuing.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isEmpty}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Use this prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
