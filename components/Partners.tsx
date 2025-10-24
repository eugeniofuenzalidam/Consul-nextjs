export default function Partners() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-12">
          Empresas que confían en nosotros
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-24 h-12 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
