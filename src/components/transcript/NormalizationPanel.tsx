"use client";

import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Transcript } from "@/types/transcript";

interface NormalizationPanelProps {
  transcript: Transcript;
}

interface AdjustmentFactor {
  id: string;
  name: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
}

export default function NormalizationPanel({
  transcript,
}: NormalizationPanelProps) {
  // Mock adjustment factors - will be replaced with actual normalization logic
  const [factors, setFactors] = useState<AdjustmentFactor[]>([
    {
      id: "rigor",
      name: "Course Rigor",
      description: "Adjustment based on course difficulty (AP/IB/Honors)",
      value: 1.1,
      min: 1.0,
      max: 1.2,
      step: 0.05,
    },
    {
      id: "scale",
      name: "School Scale",
      description: "Adjustment for school's grading scale",
      value: 1.0,
      min: 0.9,
      max: 1.1,
      step: 0.05,
    },
    {
      id: "context",
      name: "School Context",
      description: "Adjustment for school's academic strength",
      value: 1.0,
      min: 0.9,
      max: 1.1,
      step: 0.05,
    },
  ]);

  const handleFactorChange = (id: string, newValue: number) => {
    setFactors((prev) =>
      prev.map((factor) =>
        factor.id === id ? { ...factor, value: newValue } : factor
      )
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          GPA Normalization
        </h2>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-auto">
        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Normalization Summary
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                The raw GPA of {transcript.rawGPA.toFixed(2)} has been
                normalized to {transcript.normalizedGPA.toFixed(2)} based on the
                following factors. Adjust the sliders below to fine-tune the
                normalization.
              </p>
            </div>
          </div>
        </div>

        {/* Adjustment Factors */}
        <div className="space-y-6">
          {factors.map((factor) => (
            <div key={factor.id} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label
                  htmlFor={factor.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {factor.name}
                </label>
                <span className="text-sm text-gray-500">
                  {factor.value.toFixed(2)}x
                </span>
              </div>

              <input
                type="range"
                id={factor.id}
                min={factor.min}
                max={factor.max}
                step={factor.step}
                value={factor.value}
                onChange={(e) =>
                  handleFactorChange(factor.id, parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />

              <p className="text-sm text-gray-500">{factor.description}</p>
            </div>
          ))}
        </div>

        {/* Impact Visualization */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Normalization Impact
          </h3>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Raw GPA</span>
                <span className="font-medium">
                  {transcript.rawGPA.toFixed(2)}
                </span>
              </div>

              {factors.map((factor) => (
                <div key={factor.id} className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {factor.name} Adjustment
                  </span>
                  <span className="font-medium">
                    ×{factor.value.toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-medium">
                <span className="text-gray-900">Normalized GPA</span>
                <span className="text-blue-600">
                  {transcript.normalizedGPA.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
