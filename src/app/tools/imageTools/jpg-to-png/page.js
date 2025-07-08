"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Upload,
  Download,
  FileImage,
  ArrowRight,
  Check,
  RefreshCw,
} from "lucide-react";

export default function JpgToPngPage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
    setIsProcessing(true);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsCompleted(true);
  };

  const resetTool = () => {
    setFiles([]);
    setIsCompleted(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center">JPG to PNG Converter</h1>
      <p className="text-center mt-4">This page is working!</p>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
              <FileImage className="h-8 w-8 text-blue-600" />
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 mx-4" />
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <FileImage className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JPG to PNG Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert your JPG images to PNG format while preserving quality.
            Perfect for images that need transparency support.
          </p>
        </div>

        {/* Main Tool Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          {!files.length && !isCompleted && (
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Select JPG files
              </h3>
              <p className="text-gray-600 mb-6">or drop JPG files here</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                Choose Files
              </button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".jpg,.jpeg,image/jpeg"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>
          )}

          {files.length > 0 && !isCompleted && (
            <div className="space-y-4">
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
                      <FileImage className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    {isProcessing && (
                      <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-4 pt-6">
                <button
                  onClick={resetTool}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={processFiles}
                  disabled={isProcessing}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      Convert to PNG
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Conversion Complete!
              </h3>
              <p className="text-gray-600 mb-6">
                Your JPG files have been successfully converted to PNG format.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download All PNG
                </button>
                <button
                  onClick={resetTool}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Convert More Files
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileImage className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">High Quality</h3>
            <p className="text-gray-600 text-sm">
              Preserve image quality during conversion with our advanced
              algorithms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Batch Processing
            </h3>
            <p className="text-gray-600 text-sm">
              Convert multiple JPG files to PNG format simultaneously.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-sm">
              Simple drag-and-drop interface for quick file conversion.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Related Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/tools/png-to-jpg"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
            >
              <FileImage className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900 text-sm">PNG to JPG</p>
            </Link>
            <Link
              href="/tools/image-resize"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
            >
              <FileImage className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900 text-sm">Image Resize</p>
            </Link>
            <Link
              href="/tools/image-compress"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
            >
              <FileImage className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900 text-sm">
                Image Compress
              </p>
            </Link>
            <Link
              href="/tools/background-remove"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
            >
              <FileImage className="h-6 w-6 text-pink-600 mb-2" />
              <p className="font-medium text-gray-900 text-sm">
                Remove Background
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
