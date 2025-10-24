import Hero from '@/components/Hero';
import CTABar from '@/components/CTABar';
import Banner from '@/components/Banner';
import FeatureSection from '@/components/FeatureSection';
import InfoCards from '@/components/InfoCards';
import Partners from '@/components/Partners';

export default function Home() {
  return (
    <main>
      <Hero />
      <CTABar />
      <Banner />

      <FeatureSection
        title="Estrategias que transforman resultados"
        description="Desarrollamos soluciones personalizadas que impulsan el crecimiento de tu empresa, optimizando procesos y maximizando resultados."
        buttonText="Consultoría Inicial"
        imagePosition="right"
      />

      <FeatureSection
        title="Acompañamiento continuo y personalizado"
        description="No solo diseñamos la estrategia, te acompañamos en cada paso de su implementación. Tu éxito es nuestra prioridad."
        buttonText="Ver Servicios"
        imagePosition="left"
        variant="gray"
      />

      <InfoCards />
      <Partners />
    </main>
  );
}
