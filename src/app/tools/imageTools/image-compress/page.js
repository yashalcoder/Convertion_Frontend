"use client";

import { useState, useCallback } from "react";
import { FileImage, Zap, Check, HardDrive } from "lucide-react";
import ToolLayout from "../../../components/tool-layout";
import ToolHeader from "../../../components/tool-header";
import FileUploadArea from "../../../components/file-upload-area";
import ProcessingComplete from "../../../components/processing-complete";
import FeatureCards from "../../../components/feature-cards";
import RelatedTools from "../../../components/related-tools";
import CompressionSettings from "../../../components/compression-settings";
import CompressionFileList from "../../../components/compression-file-list";
import FileSizeDisplay from "../../../components/file-size-display";

export default function ImageCompressPage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [compressionType, setCompressionType] = useState("quality");
  const [quality, setQuality] = useState(80);
  const [targetSize, setTargetSize] = useState(500);
  const [targetUnit, setTargetUnit] = useState("KB");
  const [compressionResults, setCompressionResults] = useState(null);

  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles(fileArray);
      setIsCompleted(false);
      setCompressionResults(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Assumes your backend API is running on http://localhost:8000

  const processFiles = async () => {
    setIsProcessing(true);
    try {
      const promises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("compression_type", compressionType);
        formData.append("quality", quality.toString());
        formData.append("target_size", targetSize.toString());
        formData.append("target_unit", targetUnit);

        const res = await fetch("http://localhost:8000/compress", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Compression failed");

        const blob = await res.blob();
        const compressedSize = blob.size;

        return {
          originalSize: file.size,
          compressedSize,
          compressionRatio: Math.round(
            ((file.size - compressedSize) / file.size) * 100
          ),
        };
      });

      const results = await Promise.all(promises);
      setCompressionResults(results);
      setIsCompleted(true);
    } catch (err) {
      console.error("Compression error:", err);
      alert("Something went wrong while compressing images.");
    }
    setIsProcessing(false);
  };
  const handleDownload = async () => {
    if (!compressionResults || compressionResults.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("compression_type", compressionType);
      formData.append("quality", quality.toString());
      formData.append("target_size", targetSize.toString());
      formData.append("target_unit", targetUnit);

      try {
        const res = await fetch("http://localhost:8000/compress", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to download compressed image");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `compressed-${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download error:", err);
      }
    }
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
    setCompressionResults(null);
  };

  const getTotalSavings = () => {
    if (!compressionResults)
      return { originalSize: 0, compressedSize: 0, ratio: 0 };

    const totalOriginal = files.reduce((sum, file) => sum + file.size, 0);
    const totalCompressed = compressionResults.reduce(
      (sum, result) => sum + result.compressedSize,
      0
    );
    const ratio =
      totalOriginal > 0
        ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)
        : 0;

    return {
      originalSize: totalOriginal,
      compressedSize: totalCompressed,
      ratio,
    };
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      title: "Smart Compression",
      description:
        "Advanced algorithms reduce file size while preserving visual quality.",
      bgColor: "bg-purple-100",
    },
    {
      icon: <HardDrive className="h-6 w-6 text-blue-600" />,
      title: "Target Size Control",
      description:
        "Set specific file size targets in KB, MB, or GB for precise control.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Check className="h-6 w-6 text-green-600" />,
      title: "Batch Processing",
      description:
        "Compress multiple images simultaneously with consistent settings.",
      bgColor: "bg-green-100",
    },
  ];

  const relatedTools = [
    {
      name: "Image Resize",
      link: "/tools/image-resize",
      icon: <FileImage className="h-6 w-6 text-orange-600" />,
    },
    {
      name: "JPG to PNG",
      link: "/tools/jpg-to-png",
      icon: <FileImage className="h-6 w-6 text-blue-600" />,
    },
    {
      name: "PNG to JPG",
      link: "/tools/png-to-jpg",
      icon: <FileImage className="h-6 w-6 text-green-600" />,
    },
    {
      name: "Remove Background",
      link: "/tools/background-remove",
      icon: <FileImage className="h-6 w-6 text-pink-600" />,
    },
  ];

  return (
    <ToolLayout>
      <ToolHeader
        title="Image Compress Tool"
        description="Reduce image file sizes while maintaining quality. Choose between quality-based compression or target specific file sizes."
        fromIcon={<FileImage className="h-8 w-8 text-purple-600" />}
        toIcon={<Zap className="h-8 w-8 text-purple-600" />}
        fromColor="bg-purple-100"
        toColor="bg-purple-100"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        {!files.length && !isCompleted && (
          <FileUploadArea
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            acceptedTypes="image/*"
            fileTypeLabel="Image"
            buttonColor="bg-purple-600"
            hoverColor="hover:border-purple-400 hover:bg-purple-50/50"
          />
        )}

        {files.length > 0 && !isCompleted && (
          <CompressionFileList
            files={files}
            isProcessing={isProcessing}
            onClearAll={resetTool}
            onProcess={processFiles}
            buttonColor="bg-purple-600"
            compressionResults={compressionResults}
          >
            <CompressionSettings
              compressionType={compressionType}
              onCompressionTypeChange={setCompressionType}
              quality={quality}
              onQualityChange={setQuality}
              targetSize={targetSize}
              onTargetSizeChange={setTargetSize}
              targetUnit={targetUnit}
              onTargetUnitChange={setTargetUnit}
            />
          </CompressionFileList>
        )}

        {isCompleted && (
          <div className="space-y-6">
            <FileSizeDisplay
              originalSize={getTotalSavings().originalSize}
              compressedSize={getTotalSavings().compressedSize}
              compressionRatio={getTotalSavings().ratio}
            />

            <ProcessingComplete
              title="Compression Complete!"
              description={`Successfully compressed ${files.length} image${
                files.length > 1 ? "s" : ""
              } and saved ${getTotalSavings().ratio}% storage space.`}
              downloadButtonText="Download Compressed Images"
              onReset={resetTool}
              downloadButtonColor="bg-green-600"
              onDownload={handleDownload}
            />
          </div>
        )}
      </div>

      <FeatureCards features={features} />
      <RelatedTools
        tools={relatedTools}
        hoverColor="hover:border-purple-300 hover:bg-purple-50/50"
      />
    </ToolLayout>
  );
}
