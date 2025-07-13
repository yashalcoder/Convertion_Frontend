export default function FeatureCards({ features }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <div
            className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
          >
            {feature.icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
