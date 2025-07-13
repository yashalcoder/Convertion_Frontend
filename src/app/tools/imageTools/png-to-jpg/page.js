"use client";

import { useState, useCallback } from "react";
import { FileImage, Settings, Download } from "lucide-react";
import ToolLayout from "../../../components/tool-layout";
import ToolHeader from "../../../components/tool-header";
import FileUploadArea from "../../../components/file-upload-area";
import FileList from "../../../components/file-list";
import ProcessingComplete from "../../../components/processing-complete";
import FeatureCards from "../../../components/feature-cards";
import RelatedTools from "../../../components/related-tools";
import QualitySettings from "../../../components/quality-settings";

export default function PngToJpgPage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quality, setQuality] = useState(90);

  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).filter(
        (file) => file.type === "image/png"
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

  // --- In your PNG to JPG frontend page ---

  const [convertedBlobs, setConvertedBlobs] = useState([]);

  const processFiles = async () => {
    if (!files.length) return;
    setIsProcessing(true);
    const results = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("quality", quality.toString());

        const response = await fetch("http://localhost:8000/png-to-jpg", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Conversion failed for a file");

        const blob = await response.blob();
        results.push({ blob, name: file.name.replace(/\.png$/i, ".jpg") });
      }

      setConvertedBlobs(results);
      setIsCompleted(true);
    } catch (err) {
      console.error("❌ Error converting PNG to JPG:", err);
      alert("An error occurred while converting PNG files.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (convertedBlobs.length === 1) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(convertedBlobs[0].blob);
      a.download = convertedBlobs[0].name;
      a.click();
    } else {
      convertedBlobs.forEach(({ blob, name }) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
      });
    }
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
  };

  const features = [
    {
      icon: <Settings className="h-6 w-6 text-green-600" />,
      title: "Quality Control",
      description:
        "Adjust compression quality to balance file size and image quality.",
      bgColor: "bg-green-100",
    },
    {
      icon: <FileImage className="h-6 w-6 text-blue-600" />,
      title: "Batch Convert",
      description: "Process multiple PNG files at once for efficient workflow.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Download className="h-6 w-6 text-purple-600" />,
      title: "Instant Download",
      description: "Download converted files immediately after processing.",
      bgColor: "bg-purple-100",
    },
  ];

  const relatedTools = [
    {
      name: "JPG to PNG",
      link: "/tools/jpg-to-png",
      icon: <FileImage className="h-6 w-6 text-blue-600" />,
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
        title="PNG to JPG Converter"
        description="Convert PNG images to JPG format with customizable quality settings. Reduce file size while maintaining visual quality."
        fromIcon={<FileImage className="h-8 w-8 text-green-600" />}
        toIcon={<FileImage className="h-8 w-8 text-blue-600" />}
        fromColor="bg-green-100"
        toColor="bg-blue-100"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        {!files.length && !isCompleted && (
          <FileUploadArea
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            acceptedTypes=".png,image/png"
            fileTypeLabel="PNG"
            buttonColor="bg-green-600"
            hoverColor="hover:border-green-400 hover:bg-green-50/50"
          />
        )}

        {files.length > 0 && !isCompleted && (
          <FileList
            files={files}
            isProcessing={isProcessing}
            onClearAll={resetTool}
            onProcess={processFiles}
            fileIcon={<FileImage className="h-8 w-8 text-green-600" />}
            processButtonText="Convert to JPG"
            buttonColor="bg-green-600"
          >
            <QualitySettings quality={quality} onQualityChange={setQuality} />
          </FileList>
        )}

        {isCompleted && (
          <ProcessingComplete
            title="Conversion Complete!"
            description={`Your PNG files have been successfully converted to JPG format at ${quality}% quality.`}
            downloadButtonText="Download All JPG"
            onReset={resetTool}
            downloadButtonColor="bg-green-600"
            onDownload={handleDownload}
          />
        )}
      </div>

      <FeatureCards features={features} />
      <RelatedTools
        tools={relatedTools}
        hoverColor="hover:border-green-300 hover:bg-green-50/50"
      />
    </ToolLayout>
  );
}
