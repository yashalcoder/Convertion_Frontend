"use client";
import { Crop, RotateCcw, Smartphone, Maximize } from "lucide-react";

export default function MobileStyleCropSettings({
  aspectRatio,
  onAspectRatioChange,
  onResetCrop,
  onRotateImage,
  cropData,
  onFitToImage,
}) {
  const aspectRatios = [
    { value: null, label: "Free", icon: "🆓", description: "Any size" },
    {
      value: "1:1",
      label: "Square",
      icon: "⬜",
      description: "Instagram post",
    },
    { value: "4:3", label: "4:3", icon: "📷", description: "Standard photo" },
    { value: "16:9", label: "16:9", icon: "📺", description: "Widescreen" },
    { value: "3:2", label: "3:2", icon: "📸", description: "DSLR photo" },
    { value: "9:16", label: "9:16", icon: "📱", description: "Story format" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Crop className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-medium text-gray-900">Crop Settings</h4>
      </div>

      {/* Aspect Ratio Quick Select */}
      <div>
        <label className="block text-sm text-gray-600 mb-3">Aspect Ratio</label>
        <div className="grid grid-cols-3 gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value || "free"}
              onClick={() => onAspectRatioChange(ratio.value)}
              className={`p-3 border rounded-lg flex flex-col items-center space-y-1 transition-all duration-200 ${
                aspectRatio === ratio.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <div className="text-lg">{ratio.icon}</div>
              <div className="text-xs font-medium">{ratio.label}</div>
              <div className="text-xs text-gray-500 text-center">
                {ratio.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <label className="block text-sm text-gray-600 mb-3">
          Quick Actions
        </label>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={onResetCrop}
            className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm font-medium">Reset Crop</span>
          </button>
          <button
            onClick={onFitToImage}
            className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Maximize className="h-4 w-4" />
            <span className="text-sm font-medium">Fit to Image</span>
          </button>
          <button
            onClick={onRotateImage}
            className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4 transform rotate-90" />
            <span className="text-sm font-medium">Rotate 90°</span>
          </button>
        </div>
      </div>

      {/* Crop Information */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Smartphone className="h-4 w-4 text-indigo-600 mr-2" />
          <h5 className="text-sm font-medium text-indigo-900">How to Crop</h5>
        </div>
        <div className="text-xs text-indigo-700 space-y-1">
          <div>• Drag corners to resize crop area</div>
          <div>• Drag edges to adjust width/height</div>
          <div>• Drag center to move crop position</div>
          <div>• Use grid lines for better composition</div>
        </div>
      </div>

      {/* Current Crop Info */}
      {cropData && (
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-medium text-gray-900 mb-2">
            Current Crop
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-600">Position:</span>
              <div className="font-medium">
                {Math.round(cropData.x)}%, {Math.round(cropData.y)}%
              </div>
            </div>
            <div>
              <span className="text-gray-600">Size:</span>
              <div className="font-medium">
                {Math.round(cropData.width)}% × {Math.round(cropData.height)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
