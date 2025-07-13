"use client";

import { RefreshCw, ArrowRight, FileImage, Zap } from "lucide-react";

export default function CompressionFileList({
  files,
  isProcessing,
  onClearAll,
  onProcess,
  buttonColor,
  children,
  compressionResults,
}) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getTotalOriginalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const getTotalCompressedSize = () => {
    if (!compressionResults) return 0;
    return compressionResults.reduce(
      (total, result) => total + result.compressedSize,
      0
    );
  };

  const getOverallCompressionRatio = () => {
    const original = getTotalOriginalSize();
    const compressed = getTotalCompressedSize();
    if (original === 0) return 0;
    return Math.round(((original - compressed) / original) * 100);
  };

  return (
    <div className="space-y-6">
      {children && <div className="bg-gray-50 rounded-lg p-4">{children}</div>}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Selected Files ({files.length})
          </h3>
          <div className="text-sm text-gray-600">
            Total Size: {formatFileSize(getTotalOriginalSize())}
          </div>
        </div>

        <div className="space-y-3">
          {files.map((file, index) => {
            const result = compressionResults?.[index];
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center flex-1">
                  <div className="mr-3">
                    <FileImage className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Original: {formatFileSize(file.size)}</span>
                      {result && (
                        <>
                          <span>→</span>
                          <span className="text-blue-600">
                            Compressed: {formatFileSize(result.compressedSize)}
                          </span>
                          <span className="text-green-600 font-medium">
                            ({result.compressionRatio}% saved)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {isProcessing && (
                    <RefreshCw
                      className={`h-5 w-5 ${buttonColor.replace(
                        "bg-",
                        "text-"
                      )} animate-spin`}
                    />
                  )}
                  {result && !isProcessing && (
                    <div className="flex items-center text-green-600">
                      <Zap className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Compressed</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Statistics */}
      {compressionResults && compressionResults.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            Overall Compression Statistics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Original:</span>
              <div className="font-semibold text-gray-900">
                {formatFileSize(getTotalOriginalSize())}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Total Compressed:</span>
              <div className="font-semibold text-blue-600">
                {formatFileSize(getTotalCompressedSize())}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Total Saved:</span>
              <div className="font-semibold text-green-600">
                {formatFileSize(
                  getTotalOriginalSize() - getTotalCompressedSize()
                )}{" "}
                ({getOverallCompressionRatio()}%)
              </div>
            </div>
          </div>
        </div>
      )}

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
              Compressing...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Compress Images
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
