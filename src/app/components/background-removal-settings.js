"use client";
import { Scissors, Wand2, Layers } from "lucide-react";

export default function BackgroundRemovalSettings({
  removalMode,
  onRemovalModeChange,
  edgeSmoothing,
  onEdgeSmoothingChange,
  backgroundType,
  onBackgroundTypeChange,
  backgroundColor,
  onBackgroundColorChange,
}) {
  const removalModes = [
    {
      value: "auto",
      label: "Auto Detect",
      icon: <Wand2 className="h-4 w-4" />,
      description: "AI-powered automatic background removal",
    },
    {
      value: "manual",
      label: "Manual Select",
      icon: <Scissors className="h-4 w-4" />,
      description: "Click to select background areas",
    },
    {
      value: "smart",
      label: "Smart Edge",
      icon: <Layers className="h-4 w-4" />,
      description: "Advanced edge detection",
    },
  ];

  const backgroundTypes = [
    { value: "transparent", label: "Transparent", preview: "checkered" },
    { value: "white", label: "White", preview: "#ffffff" },
    { value: "black", label: "Black", preview: "#000000" },
    { value: "custom", label: "Custom Color", preview: backgroundColor },
  ];

  return (
    <>
      <div className="flex items-center mb-4">
        <Scissors className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-medium text-gray-900">
          Background Removal Settings
        </h4>
      </div>

      {/* Removal Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-3">
          Removal Method
        </label>
        <div className="space-y-2">
          {removalModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onRemovalModeChange(mode.value)}
              className={`w-full p-3 border rounded-lg flex items-start space-x-3 transition-all duration-200 ${
                removalMode === mode.value
                  ? "border-pink-500 bg-pink-50 text-pink-700"
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

      {/* Edge Smoothing */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-gray-600">Edge Smoothing</label>
          <span className="text-sm font-medium text-gray-900">
            {edgeSmoothing}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={edgeSmoothing}
          onChange={(e) => onEdgeSmoothingChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Sharp Edges</span>
          <span>Smooth Edges</span>
        </div>
      </div>

      {/* Background Type */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-3">
          New Background
        </label>
        <div className="grid grid-cols-2 gap-2">
          {backgroundTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onBackgroundTypeChange(type.value)}
              className={`p-3 border rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                backgroundType === type.value
                  ? "border-pink-500 bg-pink-50 text-pink-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border ${
                  type.preview === "checkered"
                    ? "bg-gradient-to-br from-gray-200 to-white"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    type.preview !== "checkered" ? type.preview : undefined,
                }}
              />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Picker */}
      {backgroundType === "custom" && (
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            Custom Background Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="#ffffff"
            />
          </div>
        </div>
      )}

      {/* Processing Info */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
        <h5 className="text-sm font-medium text-pink-900 mb-1">
          Processing Info
        </h5>
        <p className="text-xs text-pink-700">
          {removalMode === "auto" &&
            "AI will automatically detect and remove the background"}
          {removalMode === "manual" &&
            "Click on background areas to select them for removal"}
          {removalMode === "smart" &&
            "Advanced edge detection for precise background removal"}
        </p>
      </div>
    </>
  );
}
