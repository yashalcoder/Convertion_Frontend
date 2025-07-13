import Link from "next/link";

export default function RelatedTools({ tools, hoverColor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Related Tools
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.link}
            className={`p-4 border border-gray-200 rounded-lg ${hoverColor} transition-all duration-200`}
          >
            <div className="mb-2">{tool.icon}</div>
            <p className="font-medium text-gray-900 text-sm">{tool.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
