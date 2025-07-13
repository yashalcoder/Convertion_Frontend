"use client";
import { Zap, HardDrive } from "lucide-react";

export default function CompressionSettings({
  compressionType,
  onCompressionTypeChange,
  quality,
  onQualityChange,
  targetSize,
  onTargetSizeChange,
  targetUnit,
  onTargetUnitChange,
}) {
  const compressionTypes = [
    {
      value: "quality",
      label: "Quality Based",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      value: "size",
      label: "Target Size",
      icon: <HardDrive className="h-4 w-4" />,
    },
  ];

  const sizeUnits = [
    { value: "KB", label: "KB" },
    { value: "MB", label: "MB" },
    { value: "GB", label: "GB" },
  ];

  return (
    <>
      <div className="flex items-center mb-4">
        <Zap className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-medium text-gray-900">Compression Settings</h4>
      </div>

      {/* Compression Type Selection */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Compression Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          {compressionTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onCompressionTypeChange(type.value)}
              className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                compressionType === type.value
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {type.icon}
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quality Based Settings */}
      {compressionType === "quality" && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600">
                Compression Quality
              </label>
              <span className="text-sm font-medium text-gray-900">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => onQualityChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>High Compression</span>
              <span>Low Compression</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Quality Guide:</strong> 90-100% = Excellent quality,
              larger files | 70-89% = Good quality, balanced | 50-69% = Fair
              quality, smaller files | Below 50% = High compression, smallest
              files
            </p>
          </div>
        </div>
      )}

      {/* Target Size Settings */}
      {compressionType === "size" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Target File Size
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                max="1000"
                value={targetSize}
                onChange={(e) => onTargetSizeChange(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter size"
              />
              <select
                value={targetUnit}
                onChange={(e) => onTargetUnitChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {sizeUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700">
              <strong>Note:</strong> Target size compression may affect image
              quality. Very small target sizes might result in significant
              quality loss.
            </p>
          </div>
        </div>
      )}

      {/* Compression Preview */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h5 className="text-sm font-medium text-gray-900 mb-2">
          Expected Results
        </h5>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-600">Compression Level:</span>
            <div className="font-medium text-gray-900">
              {compressionType === "quality"
                ? quality >= 80
                  ? "Low"
                  : quality >= 50
                  ? "Medium"
                  : "High"
                : "Target Size Based"}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Quality:</span>
            <div className="font-medium text-gray-900">
              {compressionType === "quality"
                ? quality >= 80
                  ? "Excellent"
                  : quality >= 60
                  ? "Good"
                  : "Fair"
                : "Variable"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
