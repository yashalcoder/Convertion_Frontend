import Link from "next/link";

import {
  ArrowRight,
  ImageIcon,
  Video,
  Upload,
  Download,
  Zap,
  Shield,
  Clock,
  Star,
  Users,
  FileImage,
  FileVideo,
  Scissors,
  FileArchiveIcon as Compress,
} from "lucide-react";

export default function HomePage() {
  // Main services data
  const mainServices = [
    {
      id: 1,
      title: "Image Tools",
      description: "Convert, resize, compress and edit your images",
      icon: <ImageIcon className="h-12 w-12 text-blue-500" />,
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      link: "/tools/imagetools",
      tools: [
        { name: "JPG to PNG", icon: <FileImage className="h-4 w-4" /> },
        { name: "PNG to JPG", icon: <FileImage className="h-4 w-4" /> },
        { name: "Image Resize", icon: <Scissors className="h-4 w-4" /> },
        { name: "Image Compress", icon: <Compress className="h-4 w-4" /> },
      ],
    },
    {
      id: 2,
      title: "Video Tools",
      description: "Edit, convert and optimize your video files",
      icon: <Video className="h-12 w-12 text-purple-500" />,
      bgGradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      link: "/tools/videotools",
      tools: [
        { name: "MP4 to AVI", icon: <FileVideo className="h-4 w-4" /> },
        { name: "Video Compress", icon: <Compress className="h-4 w-4" /> },
        { name: "Video Trim", icon: <Scissors className="h-4 w-4" /> },
        { name: "Extract Audio", icon: <Download className="h-4 w-4" /> },
      ],
    },
  ];

  // Quick access tools
  const quickTools = [
    {
      name: "JPG to PNG",
      description: "Convert JPG to PNG instantly",
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      link: "/tools/jpg-to-png",
      color: "blue",
    },
    {
      name: "Video Compress",
      description: "Reduce video file size",
      icon: <Compress className="h-6 w-6 text-purple-500" />,
      link: "/tools/video-compress",
      color: "purple",
    },
    {
      name: "Background Remove",
      description: "Remove image backgrounds",
      icon: <Scissors className="h-6 w-6 text-pink-500" />,
      link: "/tools/background-remove",
      color: "pink",
    },
    {
      name: "Video Trim",
      description: "Cut videos to perfect length",
      icon: <Scissors className="h-6 w-6 text-cyan-500" />,
      link: "/tools/video-trim",
      color: "cyan",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        {/* Hero Section with Services */}
        <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Content */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Free Online{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  File Tools
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Convert, compress, and edit your files instantly. No software
                installation required - just upload and transform!
              </p>

              {/* Quick Upload Area */}
              <div className="max-w-md mx-auto mb-12">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports images, videos, and documents
                  </p>
                </div>
              </div>
            </div>

            {/* Main Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {mainServices.map((service) => (
                <div
                  key={service.id}
                  className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl p-8 border ${service.borderColor} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-white rounded-xl shadow-sm mr-4">
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h2>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  {/* Tool List */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.tools.map((tool, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white/60 rounded-lg p-3"
                      >
                        <div className="mr-2 text-gray-600">{tool.icon}</div>
                        <span className="text-sm font-medium text-gray-700">
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.link}
                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                  >
                    View All Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Popular Tools
              </h2>
              <p className="text-lg text-gray-600">
                Quick access to our most-used conversion tools
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.link}
                  className="group p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md hover:bg-white transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="p-4 bg-white rounded-lg shadow-sm mx-auto mb-4 w-fit group-hover:shadow-md transition-shadow duration-200">
                      {tool.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Simplified */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Transform your files in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  1. Upload
                </h3>
                <p className="text-gray-600">
                  Select your file from device or drag & drop
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2. Process
                </h3>
                <p className="text-gray-600">
                  Our tools automatically process your file
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  3. Download
                </h3>
                <p className="text-gray-600">
                  Download your converted file instantly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Simplified */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose ToolKit?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Process files in seconds, not minutes
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  100% Secure
                </h3>
                <p className="text-gray-600">
                  Files are automatically deleted after processing
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Always Available
                </h3>
                <p className="text-gray-600">
                  Access our tools 24/7 from any device
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex items-center">
                <div className="flex">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <span className="ml-2 text-gray-600 font-medium">
                  4.9/5 Rating
                </span>
              </div>

              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-600 font-medium">
                  10,000+ Happy Users
                </span>
              </div>

              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 font-medium">
                  100% Free & Secure
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Files?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of users who trust ToolKit for their file
              conversion needs
            </p>
            <Link
              href="/tools"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg inline-flex items-center text-lg"
            >
              Start Converting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
