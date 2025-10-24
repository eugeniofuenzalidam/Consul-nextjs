interface FeatureSectionProps {
  title: string;
  description: string;
  buttonText: string;
  imagePosition?: 'left' | 'right';
  variant?: 'white' | 'gray';
}

export default function FeatureSection({
  title,
  description,
  buttonText,
  imagePosition = 'right',
  variant = 'white',
}: FeatureSectionProps) {
  const bgClass = variant === 'gray' ? 'bg-gray-50' : 'bg-white';
  const order = imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className={`py-20 px-6 ${bgClass}`}>
      <div className={`max-w-7xl mx-auto flex flex-col ${order} items-center gap-12`}>
        <div className="flex-1 max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-black">{title}</h2>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105">
            {buttonText}
          </button>
        </div>
        <div className="flex-1 w-full">
          <div className="w-full h-80 bg-gradient-to-br from-[#A8C5CE] to-[#C9DBE0] rounded-xl"></div>
        </div>
      </div>
    </section>
  );
}
