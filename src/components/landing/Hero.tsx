const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(134_47%_35%/0.15),transparent_70%)]" />

    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <p className="font-bebas text-lg md:text-xl tracking-[0.4em] text-muted-foreground mb-4">
        PORTAL DEPORTIVO · FÚTBOL JUVENIL
      </p>
      <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl leading-none text-gradient-green mb-6">
        SEMILLERO<br />DE CAMPEONES
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Cobertura deportiva del fútbol juvenil y de barrio. Noticias, crónicas, estadísticas y más.
      </p>
      <a
        href="#noticias"
        className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
      >
        Explorar contenido
      </a>
    </div>

    {/* Decorative elements */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default Hero;
