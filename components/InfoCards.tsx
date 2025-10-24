export default function InfoCards() {
  const cards = [
    {
      title: 'Experiencia Comprobada',
      description: 'Con años de experiencia ayudando a empresas a alcanzar sus metas, ofrecemos soluciones probadas y efectivas adaptadas a tu industria.',
    },
    {
      title: 'Metodología Integral',
      description: 'Aplicamos un enfoque holístico que considera todos los aspectos de tu negocio para garantizar resultados sostenibles a largo plazo.',
    },
    {
      title: 'Resultados Medibles',
      description: 'Establecemos métricas claras y objetivos específicos para que puedas ver el impacto real de nuestras soluciones en tu organización.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {cards.map((card, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-bold text-black">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
