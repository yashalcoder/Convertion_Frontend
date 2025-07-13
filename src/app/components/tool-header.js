import { ArrowRight } from "lucide-react";

export default function ToolHeader({
  title,
  description,
  fromIcon,
  toIcon,
  fromColor,
  toColor,
}) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div
          className={`w-16 h-16 ${fromColor} rounded-2xl flex items-center justify-center mr-4`}
        >
          {fromIcon}
        </div>
        <ArrowRight className="h-6 w-6 text-gray-400 mx-4" />
        <div
          className={`w-16 h-16 ${toColor} rounded-2xl flex items-center justify-center`}
        >
          {toIcon}
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  );
}
