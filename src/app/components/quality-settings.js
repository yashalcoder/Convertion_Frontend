"use client";
import { Settings } from "lucide-react";

export default function QualitySettings({ quality, onQualityChange }) {
  return (
    <>
      <div className="flex items-center mb-3">
        <Settings className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-medium text-gray-900">Quality Settings</h4>
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-sm text-gray-600">Quality:</label>
        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => onQualityChange(Number(e.target.value))}
          className="flex-1 max-w-xs"
        />
        <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
          {quality}%
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Higher quality = larger file size. Lower quality = smaller file size.
      </p>
    </>
  );
}
