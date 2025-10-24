'use client';

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#5B9AA9]/10 to-[#A8C5CE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#A8C5CE]/10 to-[#5B9AA9]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black tracking-tight leading-tight">
          Fuenzalida Consulting
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Impulsamos tu negocio con soluciones estratégicas y personalizadas para alcanzar tus objetivos
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg w-full sm:w-auto overflow-hidden">
            <span className="relative z-10">Agendar Consultoría</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5B9AA9] to-[#A8C5CE] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          <button className="px-8 py-4 bg-white text-black border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-xl w-full sm:w-auto">
            Conocer Más
          </button>
        </div>

        {/* Stats o features rápidos */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="animate-slideIn" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl font-bold text-[#5B9AA9] mb-2">+50</div>
            <div className="text-sm text-gray-600">Proyectos Exitosos</div>
          </div>
          <div className="animate-slideIn" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl font-bold text-[#5B9AA9] mb-2">98%</div>
            <div className="text-sm text-gray-600">Satisfacción Cliente</div>
          </div>
          <div className="animate-slideIn" style={{animationDelay: '0.3s'}}>
            <div className="text-3xl font-bold text-[#5B9AA9] mb-2">15+</div>
            <div className="text-sm text-gray-600">Años Experiencia</div>
          </div>
        </div>
      </div>
    </section>
  );
}
