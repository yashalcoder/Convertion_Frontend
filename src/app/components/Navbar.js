"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ImageIcon,
  Video,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [expandedMobileTab, setExpandedMobileTab] = useState(null);

  const tabs = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About", link: "/about" },
    {
      id: 3,
      name: "Image Tools",
      link: "/tools/imagetools",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "JPG to PNG",
          link: "/tools/jpg-to-png",
          icon: <ArrowRight className="text-blue-500" size={16} />,
          description: "Convert JPG images to PNG format",
        },
        {
          name: "PNG to JPG",
          link: "/tools/png-to-jpg",
          icon: <ArrowRight className="text-green-500" size={16} />,
          description: "Convert PNG images to JPG format",
        },
        {
          name: "Image Resize",
          link: "/tools/image-resize",
          icon: <ArrowRight className="text-orange-500" size={16} />,
          description: "Resize your images to any dimension",
        },
        {
          name: "Image Compress",
          link: "/tools/image-compress",
          icon: <ArrowRight className="text-purple-500" size={16} />,
          description: "Reduce file size while maintaining quality",
        },
        {
          name: "Background Remove",
          link: "/tools/background-remove",
          icon: <ArrowRight className="text-pink-500" size={16} />,
          description: "Remove background from images automatically",
        },
        {
          name: "Image Crop",
          link: "/tools/image-crop",
          icon: <ArrowRight className="text-indigo-500" size={16} />,
          description: "Crop your images to perfect dimensions",
        },
      ],
    },
    {
      id: 4,
      name: "Video Tools",
      link: "/tools/videotools",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "MP4 to AVI",
          link: "/tools/mp4-to-avi",
          icon: <ArrowRight className="text-red-500" size={16} />,
          description: "Convert MP4 videos to AVI format",
        },
        {
          name: "Video Compress",
          link: "/tools/video-compress",
          icon: <ArrowRight className="text-yellow-500" size={16} />,
          description: "Reduce video file size for easier sharing",
        },
        {
          name: "Video Trim",
          link: "/tools/video-trim",
          icon: <ArrowRight className="text-cyan-500" size={16} />,
          description: "Cut your videos to the perfect length",
        },
        {
          name: "Video Merge",
          link: "/tools/video-merge",
          icon: <ArrowRight className="text-emerald-500" size={16} />,
          description: "Combine multiple videos into one file",
        },
        {
          name: "Extract Audio",
          link: "/tools/extract-audio",
          icon: <ArrowRight className="text-violet-500" size={16} />,
          description: "Extract audio tracks from your videos",
        },
        {
          name: "Add Subtitles",
          link: "/tools/add-subtitles",
          icon: <ArrowRight className="text-amber-500" size={16} />,
          description: "Add subtitles to your video files",
        },
      ],
    },
  ];

  const handleMobileTabClick = (tab) => {
    if (tab.hasDropdown) {
      // Toggle dropdown for tabs with dropdowns
      setExpandedMobileTab(expandedMobileTab === tab.id ? null : tab.id);
    } else {
      // For regular tabs, set active and close menu
      setActiveTab(tab.id);
      setIsOpen(false);
      setExpandedMobileTab(null);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-gray-900 font-bold text-xl">ToolKit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="relative group"
                onMouseEnter={() =>
                  tab.hasDropdown && setHoveredDropdown(tab.name)
                }
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <Link
                  href={tab.link}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 py-2 ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>{tab.name}</span>
                  {tab.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        hoveredDropdown === tab.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu - Multi-column layout */}
                {tab.hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-96 bg-white rounded-lg shadow-xl border border-gray-100 py-4 z-50 transition-all duration-200 origin-top ${
                      hoveredDropdown === tab.name
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 mb-3">
                      <h3 className="font-medium text-gray-900 flex items-center">
                        {tab.id === 3 && (
                          <ImageIcon size={16} className="mr-2 text-blue-500" />
                        )}
                        {tab.id === 4 && (
                          <Video size={16} className="mr-2 text-blue-500" />
                        )}
                        {tab.name}{" "}
                        <span className="text-xs text-gray-500 ml-2">
                          - All tools in one place
                        </span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-1 px-2">
                      {tab.dropdownItems?.map((item, index) => (
                        <Link
                          key={index}
                          href={item.link}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors duration-200 flex items-start rounded-md"
                        >
                          <div className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-800 truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-2">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href={tab.link}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <span>View all {tab.name.toLowerCase()}</span>
                        <ArrowRight size={12} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-4 py-2 bg-fuchsia-700 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow">
              Sign Up
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow">
              Log In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            {tabs.map((tab) => (
              <div key={tab.id}>
                <button
                  onClick={() => handleMobileTabClick(tab)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    {tab.id === 3 && <ImageIcon size={16} className="mr-2" />}
                    {tab.id === 4 && <Video size={16} className="mr-2" />}
                    <span>{tab.name}</span>
                  </div>
                  {tab.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        expandedMobileTab === tab.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Dropdown Items - Keep single column for mobile */}
                {tab.hasDropdown && expandedMobileTab === tab.id && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                    {tab.dropdownItems?.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        onClick={() => {
                          setIsOpen(false);
                          setExpandedMobileTab(null);
                        }}
                        className="block py-2 text-sm hover:text-blue-600 transition-colors duration-200"
                      >
                        <div className="flex items-start">
                          <div className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 space-y-2 border-t border-gray-100">
              <button className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                Sign In
              </button>
              <button className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-200">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
