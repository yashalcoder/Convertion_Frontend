"use client";

import { useState, useCallback } from "react";
import { FileImage, Maximize2, Check } from "lucide-react";
import ToolLayout from "../../../components/tool-layout";
import ToolHeader from "../../../components/tool-header";
import FileUploadArea from "../../../components/file-upload-area";
import FileList from "../../../components/file-list";
import ProcessingComplete from "../../../components/processing-complete";
import FeatureCards from "../../../components/feature-cards";
import RelatedTools from "../../../components/related-tools";
import ResizeSettings from "../../../components/resize-settings";

export default function ImageResizePage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles(fileArray);
      setIsCompleted(false);
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

  const [resizedBlob, setResizedBlob] = useState(null); // <-- new state

  const processFiles = async () => {
    setIsProcessing(true);
    setResizedBlob(null); // Reset previous blob

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("width", dimensions.width);
    formData.append("height", dimensions.height);
    formData.append("maintain_aspect", maintainAspectRatio);

    try {
      const response = await fetch("http://localhost:8000/resize-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image resize failed");

      const blob = await response.blob();
      setResizedBlob(blob); // Save blob instead of downloading
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Resize error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!resizedBlob) return;

    const url = window.URL.createObjectURL(resizedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resized.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // Clean up
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
  };

  const features = [
    {
      icon: <Maximize2 className="h-6 w-6 text-orange-600" />,
      title: "Custom Dimensions",
      description:
        "Set exact width and height or maintain aspect ratio automatically.",
      bgColor: "bg-orange-100",
    },
    {
      icon: <FileImage className="h-6 w-6 text-blue-600" />,
      title: "All Formats",
      description:
        "Support for JPG, PNG, GIF, WebP and other popular image formats.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Check className="h-6 w-6 text-green-600" />,
      title: "Quality Preserved",
      description:
        "Advanced algorithms ensure your images maintain their quality.",
      bgColor: "bg-green-100",
    },
  ];

  const relatedTools = [
    {
      name: "Image Compress",
      link: "/tools/image-compress",
      icon: <FileImage className="h-6 w-6 text-purple-600" />,
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
        title="Image Resize Tool"
        description="Resize your images to any dimension while maintaining quality. Perfect for web optimization and social media."
        fromIcon={<FileImage className="h-8 w-8 text-orange-600" />}
        toIcon={<Maximize2 className="h-8 w-8 text-orange-600" />}
        fromColor="bg-orange-100"
        toColor="bg-orange-100"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        {!files.length && !isCompleted && (
          <FileUploadArea
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            acceptedTypes="image/*"
            fileTypeLabel="Image"
            buttonColor="bg-orange-600"
            hoverColor="hover:border-orange-400 hover:bg-orange-50/50"
          />
        )}

        {files.length > 0 && !isCompleted && (
          <FileList
            files={files}
            isProcessing={isProcessing}
            onClearAll={resetTool}
            onProcess={processFiles}
            fileIcon={<FileImage className="h-8 w-8 text-orange-600" />}
            processButtonText="Resize Images"
            buttonColor="bg-orange-600"
          >
            <ResizeSettings
              dimensions={dimensions}
              onDimensionsChange={setDimensions}
              maintainAspectRatio={maintainAspectRatio}
              onAspectRatioChange={setMaintainAspectRatio}
            />
          </FileList>
        )}

        {isCompleted && (
          <ProcessingComplete
            title="Resize Complete!"
            description={`Your images have been resized to ${dimensions.width}x${dimensions.height} pixels.`}
            downloadButtonText="Download Resized Images"
            onReset={resetTool}
            downloadButtonColor="bg-green-600"
            onDownload={handleDownload}
          />
        )}
      </div>

      <FeatureCards features={features} />
      <RelatedTools
        tools={relatedTools}
        hoverColor="hover:border-orange-300 hover:bg-orange-50/50"
      />
    </ToolLayout>
  );
}
