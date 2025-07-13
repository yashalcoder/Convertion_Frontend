"use client";

import { useState, useCallback } from "react";
import { FileImage, Crop, Check, Square, Smartphone } from "lucide-react";
import ToolLayout from "../../../components/tool-layout";
import ToolHeader from "../../../components/tool-header";
import FileUploadArea from "../../../components/file-upload-area";
import ProcessingComplete from "../../../components/processing-complete";
import FeatureCards from "../../../components/feature-cards";
import RelatedTools from "../../../components/related-tools";
import InteractiveCropOverlay from "../../../components/interactive-crop-overlay";
import MobileStyleCropSettings from "../../../components/mobile-style-crop-settings";

export default function ImageCropPage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [cropData, setCropData] = useState({
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [resizedBlob, setResizedBlob] = useState(null); // <-- new state
  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles(fileArray);
      setIsCompleted(false);

      // Create preview for first image
      if (fileArray.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          // Reset crop when new image is loaded
          setCropData({ x: 10, y: 10, width: 80, height: 80 });
        };
        reader.readAsDataURL(fileArray[0]);
      }
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
    if (!files.length || !cropData) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", files[0]); // only first image
    formData.append("crop_data", JSON.stringify(cropData));

    try {
      const res = await fetch("http://localhost:8000/crop-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Cropping failed");

      const blob = await res.blob();
      setResizedBlob(blob); // store blob for download
      setIsCompleted(true);
    } catch (err) {
      console.error("❌ Cropping failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!resizedBlob) return;

    const downloadUrl = URL.createObjectURL(resizedBlob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "cropped.png";
    a.click();
    URL.revokeObjectURL(downloadUrl); // cleanup
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
    setImagePreview(null);
    setCropData({ x: 10, y: 10, width: 80, height: 80 });
    setAspectRatio(null);
  };

  const resetCrop = () => {
    setCropData({ x: 10, y: 10, width: 80, height: 80 });
  };

  const fitToImage = () => {
    setCropData({ x: 0, y: 0, width: 100, height: 100 });
  };

  const rotateImage = () => {
    // In a real implementation, this would rotate the image
    console.log("Rotating image...");
  };

  const handleCropChange = (newCrop) => {
    setCropData(newCrop);
  };

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);

    // Adjust crop to match aspect ratio
    if (ratio) {
      const [w, h] = ratio.split(":").map(Number);
      const aspectValue = w / h;

      const newCrop = { ...cropData };
      const currentAspect = newCrop.width / newCrop.height;

      if (currentAspect > aspectValue) {
        // Too wide, adjust width
        newCrop.width = newCrop.height * aspectValue;
      } else {
        // Too tall, adjust height
        newCrop.height = newCrop.width / aspectValue;
      }

      // Ensure crop stays within bounds
      if (newCrop.x + newCrop.width > 100) {
        newCrop.x = 100 - newCrop.width;
      }
      if (newCrop.y + newCrop.height > 100) {
        newCrop.y = 100 - newCrop.height;
      }

      setCropData(newCrop);
    }
  };

  const getCropDescription = () => {
    if (!aspectRatio) return "freeform cropping";
    return `${aspectRatio} aspect ratio cropping`;
  };

  const features = [
    {
      icon: <Smartphone className="h-6 w-6 text-indigo-600" />,
      title: "Mobile-Style Interface",
      description: "Intuitive drag-and-drop cropping just like on your phone.",
      bgColor: "bg-indigo-100",
    },
    {
      icon: <Square className="h-6 w-6 text-blue-600" />,
      title: "Smart Aspect Ratios",
      description: "Quick presets for social media, web, and print formats.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Check className="h-6 w-6 text-green-600" />,
      title: "Real-time Preview",
      description: "See exactly how your crop will look before processing.",
      bgColor: "bg-green-100",
    },
  ];

  const relatedTools = [
    {
      name: "Background Remove",
      link: "/tools/background-remove",
      icon: <FileImage className="h-6 w-6 text-pink-600" />,
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
      name: "PNG to JPG",
      link: "/tools/png-to-jpg",
      icon: <FileImage className="h-6 w-6 text-green-600" />,
    },
  ];

  return (
    <ToolLayout>
      <ToolHeader
        title="Mobile-Style Image Crop"
        description="Crop your images with an intuitive mobile-style interface. Drag corners and edges to get the perfect crop, just like on your phone."
        fromIcon={<FileImage className="h-8 w-8 text-indigo-600" />}
        toIcon={<Smartphone className="h-8 w-8 text-indigo-600" />}
        fromColor="bg-indigo-100"
        toColor="bg-indigo-100"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        {!files.length && !isCompleted && (
          <FileUploadArea
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            acceptedTypes="image/*"
            fileTypeLabel="Image"
            buttonColor="bg-indigo-600"
            hoverColor="hover:border-indigo-400 hover:bg-indigo-50/50"
          />
        )}

        {files.length > 0 && !isCompleted && (
          <div className="space-y-8">
            {/* Interactive Crop Interface */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Crop Your Image ({files.length} file
                {files.length > 1 ? "s" : ""} selected)
              </h3>
              <InteractiveCropOverlay
                imageUrl={imagePreview}
                aspectRatio={aspectRatio}
                onCropChange={handleCropChange}
                initialCrop={cropData}
              />
            </div>

            {/* Settings and Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <MobileStyleCropSettings
                  aspectRatio={aspectRatio}
                  onAspectRatioChange={handleAspectRatioChange}
                  onResetCrop={resetCrop}
                  onFitToImage={fitToImage}
                  onRotateImage={rotateImage}
                  cropData={cropData}
                />
              </div>

              {/* File List */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Files to Process</h4>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <FileImage className="h-6 w-6 text-indigo-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={resetTool}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={processFiles}
                    disabled={isProcessing}
                    className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Crop className="h-4 w-4 mr-2" />
                        Crop Images
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isCompleted && (
          <ProcessingComplete
            title="Cropping Complete!"
            description={`Successfully cropped ${files.length} image${
              files.length > 1 ? "s" : ""
            } using ${getCropDescription()}.`}
            downloadButtonText="Download Cropped Images"
            onReset={resetTool}
            downloadButtonColor="bg-green-600"
            onDownload={handleDownload}
          />
        )}
      </div>

      <FeatureCards features={features} />
      <RelatedTools
        tools={relatedTools}
        hoverColor="hover:border-indigo-300 hover:bg-indigo-50/50"
      />
    </ToolLayout>
  );
}
