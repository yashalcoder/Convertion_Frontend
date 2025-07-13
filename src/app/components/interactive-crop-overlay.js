"use client";
import { useState, useRef, useEffect } from "react";

export default function InteractiveCropOverlay({
  imageUrl,
  onCropChange,
  aspectRatio = null,
  initialCrop = { x: 10, y: 10, width: 80, height: 80 },
}) {
  const [crop, setCrop] = useState(initialCrop);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    onCropChange?.(crop);
  }, [crop, onCropChange]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  const getMousePosition = (e) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  const handleMouseDown = (e, type, corner = null) => {
    e.preventDefault();
    e.stopPropagation();

    const mousePos = getMousePosition(e);
    setIsDragging(true);
    setDragType(type);
    setDragStart({
      x: mousePos.x,
      y: mousePos.y,
      crop: { ...crop },
      corner,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const mousePos = getMousePosition(e);
    const deltaX = mousePos.x - dragStart.x;
    const deltaY = mousePos.y - dragStart.y;

    const newCrop = { ...dragStart.crop };

    if (dragType === "move") {
      newCrop.x = Math.max(
        0,
        Math.min(100 - newCrop.width, dragStart.crop.x + deltaX)
      );
      newCrop.y = Math.max(
        0,
        Math.min(100 - newCrop.height, dragStart.crop.y + deltaY)
      );
    } else if (dragType === "corner") {
      const { corner } = dragStart;

      if (corner.includes("right")) {
        newCrop.width = Math.max(
          5,
          Math.min(100 - newCrop.x, dragStart.crop.width + deltaX)
        );
      }
      if (corner.includes("left")) {
        const newWidth = Math.max(5, dragStart.crop.width - deltaX);
        const newX = Math.max(
          0,
          Math.min(dragStart.crop.x + deltaX, 100 - newWidth)
        );
        newCrop.width = newWidth;
        newCrop.x = newX;
      }
      if (corner.includes("bottom")) {
        newCrop.height = Math.max(
          5,
          Math.min(100 - newCrop.y, dragStart.crop.height + deltaY)
        );
      }
      if (corner.includes("top")) {
        const newHeight = Math.max(5, dragStart.crop.height - deltaY);
        const newY = Math.max(
          0,
          Math.min(dragStart.crop.y + deltaY, 100 - newHeight)
        );
        newCrop.height = newHeight;
        newCrop.y = newY;
      }

      // Maintain aspect ratio if specified
      if (aspectRatio && aspectRatio !== null) {
        const [ratioW, ratioH] = aspectRatio.split(":").map(Number);
        const targetRatio = ratioW / ratioH;

        if (corner.includes("right") || corner.includes("left")) {
          const newHeight = newCrop.width / targetRatio;
          if (newCrop.y + newHeight <= 100) {
            newCrop.height = newHeight;
          } else {
            newCrop.height = 100 - newCrop.y;
            newCrop.width = newCrop.height * targetRatio;
          }
        } else {
          const newWidth = newCrop.height * targetRatio;
          if (newCrop.x + newWidth <= 100) {
            newCrop.width = newWidth;
          } else {
            newCrop.width = 100 - newCrop.x;
            newCrop.height = newCrop.width / targetRatio;
          }
        }
      }
    } else if (dragType === "edge") {
      const { corner: edge } = dragStart;

      if (edge === "top") {
        const newHeight = Math.max(5, dragStart.crop.height - deltaY);
        const newY = Math.max(
          0,
          Math.min(dragStart.crop.y + deltaY, 100 - newHeight)
        );
        newCrop.height = newHeight;
        newCrop.y = newY;
      } else if (edge === "bottom") {
        newCrop.height = Math.max(
          5,
          Math.min(100 - newCrop.y, dragStart.crop.height + deltaY)
        );
      } else if (edge === "left") {
        const newWidth = Math.max(5, dragStart.crop.width - deltaX);
        const newX = Math.max(
          0,
          Math.min(dragStart.crop.x + deltaX, 100 - newWidth)
        );
        newCrop.width = newWidth;
        newCrop.x = newX;
      } else if (edge === "right") {
        newCrop.width = Math.max(
          5,
          Math.min(100 - newCrop.x, dragStart.crop.width + deltaX)
        );
      }
    }

    setCrop(newCrop);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full bg-gray-200 overflow-hidden select-none"
        style={{
          cursor: isDragging ? "grabbing" : "default",
          minHeight: "400px",
        }}
      >
        {/* Background Image */}
        {imageUrl ? (
          <img
            ref={imageRef}
            src={imageUrl || "/placeholder.svg"}
            alt="Crop preview"
            className="w-full h-auto object-contain max-h-[600px] block"
            draggable={false}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-96 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <div className="text-lg">Upload an image to start cropping</div>
            </div>
          </div>
        )}

        {/* Crop Overlay - Only show when image is loaded */}
        {imageLoaded && imageUrl && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Create the overlay effect using CSS clip-path or multiple divs */}

            {/* Crop Area Border and Handles */}
            <div
              className="absolute border-2 border-white shadow-lg pointer-events-auto"
              style={{
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
                cursor: "move",
                minWidth: "20px",
                minHeight: "20px",
              }}
              onMouseDown={(e) => handleMouseDown(e, "move")}
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                {/* Vertical lines */}
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white" />
                {/* Horizontal lines */}
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
              </div>

              {/* Corner Handles */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (corner) => (
                  <div
                    key={corner}
                    className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:bg-blue-50 transition-colors z-10"
                    style={{
                      [corner.includes("top") ? "top" : "bottom"]: 0,
                      [corner.includes("left") ? "left" : "right"]: 0,
                      cursor: `${
                        corner.includes("top")
                          ? corner.includes("left")
                            ? "nw"
                            : "ne"
                          : corner.includes("left")
                          ? "sw"
                          : "se"
                      }-resize`,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, "corner", corner)}
                  />
                )
              )}

              {/* Edge Handles */}
              {["top", "bottom", "left", "right"].map((edge) => (
                <div
                  key={edge}
                  className="absolute bg-white border border-blue-500 rounded shadow-lg hover:bg-blue-50 transition-colors z-10"
                  style={{
                    ...(edge === "top" && {
                      top: 0,
                      left: "50%",
                      width: "24px",
                      height: "6px",
                      transform: "translate(-50%, -50%)",
                      cursor: "ns-resize",
                    }),
                    ...(edge === "bottom" && {
                      bottom: 0,
                      left: "50%",
                      width: "24px",
                      height: "6px",
                      transform: "translate(-50%, 50%)",
                      cursor: "ns-resize",
                    }),
                    ...(edge === "left" && {
                      left: 0,
                      top: "50%",
                      width: "6px",
                      height: "24px",
                      transform: "translate(-50%, -50%)",
                      cursor: "ew-resize",
                    }),
                    ...(edge === "right" && {
                      right: 0,
                      top: "50%",
                      width: "6px",
                      height: "24px",
                      transform: "translate(50%, -50%)",
                      cursor: "ew-resize",
                    }),
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "edge", edge)}
                />
              ))}

              {/* Center Move Handle */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-20 rounded-full border-2 border-white flex items-center justify-center cursor-move hover:bg-opacity-30 transition-all z-10"
                onMouseDown={(e) => handleMouseDown(e, "move")}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Crop Info */}
      <div className="p-4 bg-white border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">X:</span>
            <span className="ml-1 font-medium">{Math.round(crop.x)}%</span>
          </div>
          <div>
            <span className="text-gray-600">Y:</span>
            <span className="ml-1 font-medium">{Math.round(crop.y)}%</span>
          </div>
          <div>
            <span className="text-gray-600">Width:</span>
            <span className="ml-1 font-medium">{Math.round(crop.width)}%</span>
          </div>
          <div>
            <span className="text-gray-600">Height:</span>
            <span className="ml-1 font-medium">{Math.round(crop.height)}%</span>
          </div>
        </div>

        {imageDimensions.width > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
              <div>
                <span>Crop X:</span>
                <span className="ml-1">
                  {Math.round((crop.x / 100) * imageDimensions.width)}px
                </span>
              </div>
              <div>
                <span>Crop Y:</span>
                <span className="ml-1">
                  {Math.round((crop.y / 100) * imageDimensions.height)}px
                </span>
              </div>
              <div>
                <span>Crop W:</span>
                <span className="ml-1">
                  {Math.round((crop.width / 100) * imageDimensions.width)}px
                </span>
              </div>
              <div>
                <span>Crop H:</span>
                <span className="ml-1">
                  {Math.round((crop.height / 100) * imageDimensions.height)}px
                </span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Original: {imageDimensions.width} × {imageDimensions.height}px
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
