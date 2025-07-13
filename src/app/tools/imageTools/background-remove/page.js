"use client";

import { useState, useCallback } from "react";
import { FileImage, Scissors, Check, Wand2, Layers } from "lucide-react";
import ToolLayout from "../../../components/tool-layout";
import ToolHeader from "../../../components/tool-header";
import FileUploadArea from "../../../components/file-upload-area";
import FileList from "../../../components/file-list";
import ProcessingComplete from "../../../components/processing-complete";
import FeatureCards from "../../../components/feature-cards";
import RelatedTools from "../../../components/related-tools";
import BackgroundRemovalSettings from "../../../components/background-removal-settings";

export default function BackgroundRemovePage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [removalMode, setRemovalMode] = useState("auto");
  const [edgeSmoothing, setEdgeSmoothing] = useState(50);
  const [backgroundType, setBackgroundType] = useState("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

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

  const processFiles = async () => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("removal_mode", removalMode);
      formData.append("background_type", backgroundType);
      formData.append("background_color", backgroundColor);

      console.log("📤 Sending request to /remove-background");

      const response = await fetch("http://localhost:8000/remove-background", {
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", response.status);
      console.log("📥 Response headers:", [...response.headers.entries()]);

      if (!response.ok) throw new Error("Background removal failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      console.log("✅ Blob created:", url);

      setFiles([{ ...files[0], preview: url }]);
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Background removal error:", error);
      alert("Something went wrong.");
    }

    setIsProcessing(false);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = files[0].preview; // assuming preview is set above
    a.download = "bg_removed.png";
    a.click();
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
  };

  const features = [
    {
      icon: <Wand2 className="h-6 w-6 text-pink-600" />,
      title: "AI-Powered Removal",
      description:
        "Advanced AI automatically detects and removes backgrounds with precision.",
      bgColor: "bg-pink-100",
    },
    {
      icon: <Layers className="h-6 w-6 text-purple-600" />,
      title: "Edge Smoothing",
      description:
        "Smart edge detection ensures clean, professional-looking results.",
      bgColor: "bg-purple-100",
    },
    {
      icon: <Check className="h-6 w-6 text-green-600" />,
      title: "Multiple Formats",
      description:
        "Export with transparent background or custom colored backgrounds.",
      bgColor: "bg-green-100",
    },
  ];

  const relatedTools = [
    {
      name: "Image Crop",
      link: "/tools/image-crop",
      icon: <Scissors className="h-6 w-6 text-indigo-600" />,
    },
    {
      name: "Image Resize",
      link: "/tools/image-resize",
      icon: <FileImage className="h-6 w-6 text-orange-600" />,
    },
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
  ];

  return (
    <ToolLayout>
      <ToolHeader
        title="Background Remover"
        description="Remove backgrounds from images using AI technology. Perfect for product photos, portraits, and creating transparent images."
        fromIcon={<FileImage className="h-8 w-8 text-pink-600" />}
        toIcon={<Scissors className="h-8 w-8 text-pink-600" />}
        fromColor="bg-pink-100"
        toColor="bg-pink-100"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        {!files.length && !isCompleted && (
          <FileUploadArea
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            acceptedTypes="image/*"
            fileTypeLabel="Image"
            buttonColor="bg-pink-600"
            hoverColor="hover:border-pink-400 hover:bg-pink-50/50"
          />
        )}

        {files.length > 0 && !isCompleted && (
          <FileList
            files={files}
            isProcessing={isProcessing}
            onClearAll={resetTool}
            onProcess={processFiles}
            fileIcon={<FileImage className="h-8 w-8 text-pink-600" />}
            processButtonText="Remove Background"
            buttonColor="bg-pink-600"
          >
            <BackgroundRemovalSettings
              removalMode={removalMode}
              onRemovalModeChange={setRemovalMode}
              edgeSmoothing={edgeSmoothing}
              onEdgeSmoothingChange={setEdgeSmoothing}
              backgroundType={backgroundType}
              onBackgroundTypeChange={setBackgroundType}
              backgroundColor={backgroundColor}
              onBackgroundColorChange={setBackgroundColor}
            />
          </FileList>
        )}

        {isCompleted && (
          <ProcessingComplete
            title="Background Removal Complete!"
            description={`Successfully removed backgrounds from ${
              files.length
            } image${
              files.length > 1 ? "s" : ""
            } using ${removalMode} mode with ${backgroundType} background.`}
            downloadButtonText="Download Images"
            onReset={resetTool}
            downloadButtonColor="bg-green-600"
            onDownload={handleDownload}
          />
        )}
      </div>

      <FeatureCards features={features} />
      <RelatedTools
        tools={relatedTools}
        hoverColor="hover:border-pink-300 hover:bg-pink-50/50"
      />
    </ToolLayout>
  );
}
