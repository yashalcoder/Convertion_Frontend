import Link from "next/link";
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  ImageIcon,
  Video,
  Zap,
  Shield,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const toolCategories = [
    {
      title: "Image Tools",
      icon: <ImageIcon size={20} className="text-blue-500" />,
      description: "Transform your images with ease",
      tools: [
        {
          name: "JPG to PNG",
          link: "/tools/jpg-to-png",
          color: "text-blue-500",
        },
        {
          name: "PNG to JPG",
          link: "/tools/png-to-jpg",
          color: "text-green-500",
        },
        {
          name: "Image Resize",
          link: "/tools/image-resize",
          color: "text-orange-500",
        },
        {
          name: "Background Remove",
          link: "/tools/background-remove",
          color: "text-pink-500",
        },
      ],
    },
    {
      title: "Video Tools",
      icon: <Video size={20} className="text-purple-500" />,
      description: "Edit and convert videos effortlessly",
      tools: [
        {
          name: "MP4 to AVI",
          link: "/tools/mp4-to-avi",
          color: "text-red-500",
        },
        {
          name: "Video Compress",
          link: "/tools/video-compress",
          color: "text-yellow-500",
        },
        {
          name: "Video Trim",
          link: "/tools/video-trim",
          color: "text-cyan-500",
        },
        {
          name: "Extract Audio",
          link: "/tools/extract-audio",
          color: "text-violet-500",
        },
      ],
    },
  ];

  const features = [
    {
      icon: <Zap size={16} className="text-yellow-500" />,
      title: "Lightning Fast",
      description: "Process files in seconds",
    },
    {
      icon: <Shield size={16} className="text-green-500" />,
      title: "100% Secure",
      description: "Your files are safe with us",
    },
    {
      icon: <Clock size={16} className="text-blue-500" />,
      title: "24/7 Available",
      description: "Use our tools anytime",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">ToolKit</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your one-stop solution for all digital tools. Transform, convert,
              and optimize your files with our powerful and easy-to-use online
              tools.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">{feature.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <Link
                href="#"
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-blue-500"
              >
                <Twitter size={16} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-blue-600"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-pink-500"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-gray-800"
              >
                <Github size={16} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-blue-700"
              >
                <Linkedin size={16} />
              </Link>
            </div>
          </div>

          {/* Tool Categories */}
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center space-x-2">
                {category.icon}
                <h3 className="font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <Link
                    key={toolIndex}
                    href={tool.link}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                  >
                    <ArrowRight
                      size={12}
                      className={`${tool.color} group-hover:translate-x-1 transition-transform duration-200`}
                    />
                    <span>{tool.name}</span>
                  </Link>
                ))}
                <Link
                  href={
                    categoryIndex === 0
                      ? "/tools/imagetools"
                      : "/tools/videotools"
                  }
                  className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                >
                  <span>View all {category.title.toLowerCase()}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}

          {/* Company & Support */}
          <div className="space-y-6">
            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Users size={16} className="mr-2 text-gray-600" />
                Company
              </h3>
              <ul className="space-y-2">
                {[
                  { name: "About Us", link: "/about" },
                  { name: "Careers", link: "/careers" },
                  { name: "Blog", link: "/blog" },
                  { name: "Press Kit", link: "/press" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight
                        size={12}
                        className="mr-2 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-blue-500" />
                  <a
                    href="mailto:support@toolkit.com"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    support@toolkit.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-green-500" />
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Link
                  href="/help"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                  />
                  Help Center
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                  />
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                  />
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-600">
                Get the latest tools and features delivered to your inbox
              </p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-grow md:w-64"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-r-lg text-sm font-medium hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
