import Link from "next/link";
import { FileImage, Video, ArrowRight } from "lucide-react";

export default function ToolsPage() {
  const imageTools = [
    {
      name: "JPG to PNG",
      description: "Convert JPG images to PNG format",
      link: "/tools/imageTools/jpg-to-png",
      icon: <FileImage className="h-6 w-6 text-blue-600" />,
      color: "blue",
    },
    {
      name: "PNG to JPG",
      description: "Convert PNG images to JPG format",
      link: "/tools/imageTools/png-to-jpg",
      icon: <FileImage className="h-6 w-6 text-green-600" />,
      color: "green",
    },
    {
      name: "Image Resize",
      description: "Resize images to any dimension",
      link: "/tools/imageTools/image-resize",
      icon: <FileImage className="h-6 w-6 text-orange-600" />,
      color: "orange",
    },
  ];

  const videoTools = [
    {
      name: "MP4 to AVI",
      description: "Convert MP4 videos to AVI format",
      link: "/tools/vedioTools/mp4-to-avi",
      icon: <Video className="h-6 w-6 text-red-600" />,
      color: "red",
    },
    {
      name: "Video Compress",
      description: "Reduce video file size",
      link: "/tools/vedioTools/video-compress",
      icon: <Video className="h-6 w-6 text-purple-600" />,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="max-w-6xl mx-auto px-4 py-12 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tools</h1>
          <p className="text-xl text-gray-600">
            Choose from our collection of powerful online tools
          </p>
        </div>

        {/* Image Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileImage className="h-6 w-6 text-blue-600 mr-2" />
            Image Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  {tool.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Try it now</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Video Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Video className="h-6 w-6 text-purple-600 mr-2" />
            Video Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  {tool.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Try it now</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
