"use client";

import { useState, useCallback } from "react";
import { FileImage, Check, Upload } from "lucide-react";
import ToolLayout from "../../../components/tool-layout";
import ToolHeader from "../../../components/tool-header";
import FileUploadArea from "../../../components/file-upload-area";
import FileList from "../../../components/file-list";
import ProcessingComplete from "../../../components/processing-complete";
import FeatureCards from "../../../components/feature-cards";
import RelatedTools from "../../../components/related-tools";

export default function JpgToPngPage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/jpg"
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
    if (!files.length) return;

    setIsProcessing(true);
    console.log("⏳ Starting conversion...");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await fetch("http://localhost:8000/convert", {
        method: "POST",
        body: formData,
      });

      console.log("✅ Got response", response);

      if (!response.ok) {
        throw new Error("Failed to convert image");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      console.log("✅ Converted blob ready:", url);

      setConvertedBlob(url);
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Conversion error:", error);
      alert("Image conversion failed.");
    } finally {
      console.log("✅ Done. Turning off spinner.");
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = convertedBlob; // your blob URL
    a.download = "converted.png";
    a.click();
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
  };

  const features = [
    {
      icon: <FileImage className="h-6 w-6 text-blue-600" />,
      title: "High Quality",
      description:
        "Preserve image quality during conversion with our advanced algorithms.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Check className="h-6 w-6 text-green-600" />,
      title: "Batch Processing",
      description: "Convert multiple JPG files to PNG format simultaneously.",
      bgColor: "bg-green-100",
    },
    {
      icon: <Upload className="h-6 w-6 text-purple-600" />,
      title: "Easy to Use",
      description: "Simple drag-and-drop interface for quick file conversion.",
      bgColor: "bg-purple-100",
    },
  ];

  const relatedTools = [
    {
      name: "PNG to JPG",
      link: "/tools/png-to-jpg",
      icon: <FileImage className="h-6 w-6 text-green-600" />,
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
      name: "Remove Background",
      link: "/tools/background-remove",
      icon: <FileImage className="h-6 w-6 text-pink-600" />,
    },
  ];

  return (
    <ToolLayout>
      <ToolHeader
        title="JPG to PNG Converter"
        description="Convert your JPG images to PNG format while preserving quality. Perfect for images that need transparency support."
        fromIcon={<FileImage className="h-8 w-8 text-blue-600" />}
        toIcon={<FileImage className="h-8 w-8 text-green-600" />}
        fromColor="bg-blue-100"
        toColor="bg-green-100"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        {!files.length && !isCompleted && (
          <FileUploadArea
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            acceptedTypes=".jpg,.jpeg,image/jpeg"
            fileTypeLabel="JPG"
            buttonColor="bg-blue-600"
            hoverColor="hover:border-blue-400 hover:bg-blue-50/50"
          />
        )}

        {files.length > 0 && !isCompleted && (
          <FileList
            files={files}
            isProcessing={isProcessing}
            onClearAll={resetTool}
            onProcess={processFiles}
            fileIcon={<FileImage className="h-8 w-8 text-blue-600" />}
            processButtonText="Convert to PNG"
            buttonColor="bg-blue-600"
          />
        )}

        {isCompleted && (
          <ProcessingComplete
            title="Conversion Complete!"
            description="Your JPG image is converted. Click below to download it."
            downloadButtonText="Download PNG"
            downloadButtonColor="bg-green-600"
            onDownload={handleDownload} // ✅ here
            onReset={resetTool}
          />
        )}
      </div>

      <FeatureCards features={features} />
      <RelatedTools
        tools={relatedTools}
        hoverColor="hover:border-blue-300 hover:bg-blue-50/50"
      />
    </ToolLayout>
  );
}
