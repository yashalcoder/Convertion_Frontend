"use client";
import { Check, Download } from "lucide-react";

export default function ProcessingComplete({
  title,
  description,
  downloadButtonText,
  onReset,
  onDownload, // ✅ new prop
  downloadButtonColor,
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onDownload} // ✅ trigger download
          className={`${downloadButtonColor} text-white hover:cursor-pointer px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors duration-200 flex items-center`}
        >
          <Download className="h-4 w-4 mr-2" />
          {downloadButtonText}
        </button>

        <button
          onClick={onReset}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Convert More Files
        </button>
      </div>
    </div>
  );
}
