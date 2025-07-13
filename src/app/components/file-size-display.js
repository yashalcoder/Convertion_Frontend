export default function FileSizeDisplay({
  originalSize,
  compressedSize,
  compressionRatio,
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

  const getSavingsColor = (ratio) => {
    if (ratio >= 70) return "text-green-600";
    if (ratio >= 50) return "text-blue-600";
    if (ratio >= 30) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3">Compression Results</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">Original Size</div>
          <div className="text-lg font-semibold text-gray-900">
            {formatFileSize(originalSize)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Compressed Size</div>
          <div className="text-lg font-semibold text-blue-600">
            {formatFileSize(compressedSize)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Space Saved</div>
          <div
            className={`text-lg font-semibold ${getSavingsColor(
              compressionRatio
            )}`}
          >
            {compressionRatio}%
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${compressionRatio}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          You saved {formatFileSize(originalSize - compressedSize)} of storage
          space
        </div>
      </div>
    </div>
  );
}
