"use client";

import { Upload } from "lucide-react";

export default function FileUploadArea({
  onFileSelect,
  onDrop,
  onDragOver,
  acceptedTypes,
  fileTypeLabel,
  buttonColor,
  hoverColor,
}) {
  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-xl p-12 text-center ${hoverColor} transition-all duration-200 cursor-pointer`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <div
        className={`w-20 h-20 ${buttonColor
          .replace("bg-", "bg-")
          .replace(
            "-600",
            "-100"
          )} rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        <Upload
          className={`h-10 w-10 ${buttonColor.replace("bg-", "text-")}`}
        />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Select {fileTypeLabel} files
      </h3>
      <p className="text-gray-600 mb-6">or drop {fileTypeLabel} files here</p>
      <button
        className={`${buttonColor} text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors duration-200`}
      >
        Choose Files
      </button>
      <input
        id="file-input"
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={(e) => onFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
