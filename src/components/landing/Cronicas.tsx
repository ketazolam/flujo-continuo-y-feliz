const cronicas = [
  {
    tag: "CRÓNICA SUB-12",
    title: "La final que hizo llorar hasta al árbitro",
    desc: "Cinco goles, dos expulsiones y una tanda de penales interminable. Una crónica del partido que resumió toda una temporada.",
    date: "Hoy",
  },
  {
    tag: "ANÁLISIS SUB-17",
    title: "¿Por qué el Sub-17 es el equipo más completo del torneo?",
    desc: "Datos, tácticas y los testimonios de los protagonistas detrás del equipo favorito.",
    date: "Hace 5 días",
  },
  {
    tag: "CONTENIDO EXCLUSIVO",
    title: "Entrevista con el DT revelación del torneo",
    desc: "Habla el técnico que llevó a un equipo desconocido a semifinales con puro corazón y táctica.",
    date: "Hace 3 días",
  },
];

const Cronicas = () => (
  <section id="cronicas" className="py-20 px-4 bg-secondary/30">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-primary text-sm font-semibold mb-1">Crónicas</p>
          <h2 className="font-bebas text-4xl md:text-5xl tracking-wider text-foreground">
            DESDE LA CANCHA
          </h2>
        </div>
        <a href="#" className="text-primary text-sm hover:underline hidden md:inline">
          Ver todas →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cronicas.map((c, i) => (
          <article key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <span className="text-xs font-semibold text-primary tracking-widest">{c.tag}</span>
            <h3 className="font-bebas text-xl md:text-2xl mt-2 mb-2 text-foreground">{c.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{c.desc}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{c.date}</span>
              <a href="#" className="text-primary hover:underline">Leer →</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Cronicas;
