"use client";

import { RefreshCw, ArrowRight } from "lucide-react";

export default function FileList({
  files,
  isProcessing,
  onClearAll,
  onProcess,
  fileIcon,
  processButtonText,
  buttonColor,
  children, // For additional settings like quality slider
}) {
  return (
    <div className="space-y-6">
      {children && <div className="bg-gray-50 rounded-lg p-4">{children}</div>}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Selected Files ({files.length})
        </h3>
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="mr-3">{fileIcon}</div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {isProcessing && (
                <RefreshCw
                  className={`h-5 w-5 ${buttonColor.replace(
                    "bg-",
                    "text-"
                  )} animate-spin`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={onClearAll}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Clear All
        </button>
        <button
          onClick={onProcess}
          disabled={isProcessing}
          className={`${buttonColor} text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {processButtonText}
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
