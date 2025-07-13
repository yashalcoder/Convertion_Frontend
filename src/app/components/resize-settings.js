"use client";
import { Maximize2 } from "lucide-react";

export default function ResizeSettings({
  dimensions,
  onDimensionsChange,
  maintainAspectRatio,
  onAspectRatioChange,
}) {
  return (
    <>
      <div className="flex items-center mb-4">
        <Maximize2 className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-medium text-gray-900">Resize Settings</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Width (px)</label>
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) =>
              onDimensionsChange({
                ...dimensions,
                width: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Height (px)
          </label>
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) =>
              onDimensionsChange({
                ...dimensions,
                height: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={maintainAspectRatio}
            onChange={(e) => onAspectRatioChange(e.target.checked)}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            Maintain aspect ratio
          </span>
        </label>
      </div>
    </>
  );
}
