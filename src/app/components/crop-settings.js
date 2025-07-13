"use client";
import { Crop, Square, Monitor } from "lucide-react";

export default function CropSettings({
  cropMode,
  onCropModeChange,
  aspectRatio,
  onAspectRatioChange,
  customDimensions,
  onCustomDimensionsChange,
  cropPosition,
  onCropPositionChange,
}) {
  const cropModes = [
    {
      value: "freeform",
      label: "Freeform",
      icon: <Crop className="h-4 w-4" />,
      description: "Crop to any size",
    },
    {
      value: "aspect",
      label: "Aspect Ratio",
      icon: <Square className="h-4 w-4" />,
      description: "Maintain proportions",
    },
    {
      value: "custom",
      label: "Custom Size",
      icon: <Monitor className="h-4 w-4" />,
      description: "Exact dimensions",
    },
  ];

  const aspectRatios = [
    { value: "1:1", label: "Square (1:1)", description: "Instagram posts" },
    {
      value: "4:3",
      label: "Standard (4:3)",
      description: "Traditional photos",
    },
    {
      value: "16:9",
      label: "Widescreen (16:9)",
      description: "YouTube thumbnails",
    },
    { value: "3:2", label: "Photo (3:2)", description: "DSLR standard" },
    {
      value: "9:16",
      label: "Portrait (9:16)",
      description: "Instagram stories",
    },
    { value: "21:9", label: "Ultrawide (21:9)", description: "Cinematic" },
  ];

  const cropPositions = [
    { value: "center", label: "Center", icon: "⊞" },
    { value: "top", label: "Top", icon: "⊤" },
    { value: "bottom", label: "Bottom", icon: "⊥" },
    { value: "left", label: "Left", icon: "⊣" },
    { value: "right", label: "Right", icon: "⊢" },
    { value: "top-left", label: "Top Left", icon: "⌜" },
    { value: "top-right", label: "Top Right", icon: "⌝" },
    { value: "bottom-left", label: "Bottom Left", icon: "⌞" },
    { value: "bottom-right", label: "Bottom Right", icon: "⌟" },
  ];

  return (
    <>
      <div className="flex items-center mb-4">
        <Crop className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-medium text-gray-900">Crop Settings</h4>
      </div>

      {/* Crop Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-3">Crop Mode</label>
        <div className="space-y-2">
          {cropModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onCropModeChange(mode.value)}
              className={`w-full p-3 border rounded-lg flex items-start space-x-3 transition-all duration-200 ${
                cropMode === mode.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">{mode.icon}</div>
              <div className="text-left">
                <div className="font-medium">{mode.label}</div>
                <div className="text-xs text-gray-500">{mode.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Aspect Ratio Selection */}
      {cropMode === "aspect" && (
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-3">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-1 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => onAspectRatioChange(ratio.value)}
                className={`p-3 border rounded-lg flex items-center justify-between transition-all duration-200 ${
                  aspectRatio === ratio.value
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div>
                  <div className="font-medium text-left">{ratio.label}</div>
                  <div className="text-xs text-gray-500 text-left">
                    {ratio.description}
                  </div>
                </div>
                <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {ratio.value}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Dimensions */}
      {cropMode === "custom" && (
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-3">
            Custom Dimensions (pixels)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Width</label>
              <input
                type="number"
                min="1"
                value={customDimensions.width}
                onChange={(e) =>
                  onCustomDimensionsChange({
                    ...customDimensions,
                    width: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="800"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Height</label>
              <input
                type="number"
                min="1"
                value={customDimensions.height}
                onChange={(e) =>
                  onCustomDimensionsChange({
                    ...customDimensions,
                    height: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Crop Position */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-3">
          Crop Position
        </label>
        <div className="grid grid-cols-3 gap-2">
          {cropPositions.map((position) => (
            <button
              key={position.value}
              onClick={() => onCropPositionChange(position.value)}
              className={`p-3 border rounded-lg flex flex-col items-center space-y-1 transition-all duration-200 ${
                cropPosition === position.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-lg">{position.icon}</div>
              <div className="text-xs font-medium">{position.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Info */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
        <h5 className="text-sm font-medium text-indigo-900 mb-1">
          Crop Preview
        </h5>
        <div className="text-xs text-indigo-700 space-y-1">
          <div>Mode: {cropModes.find((m) => m.value === cropMode)?.label}</div>
          {cropMode === "aspect" && <div>Ratio: {aspectRatio}</div>}
          {cropMode === "custom" && (
            <div>
              Size: {customDimensions.width} × {customDimensions.height}px
            </div>
          )}
          <div>
            Position:{" "}
            {cropPositions.find((p) => p.value === cropPosition)?.label}
          </div>
        </div>
      </div>
    </>
  );
}
