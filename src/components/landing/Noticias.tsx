const noticias = [
  {
    tag: "CRÓNICA",
    title: "La final Sub-12 que nadie olvidará: remontada, penales y lágrimas en el campo",
    desc: "Un partido que tuvo de todo. Goles, expulsiones, una remontada increíble y una definición a puro corazón.",
    date: "Hoy",
    read: "8 min de lectura",
    cat: "Sub-12",
  },
  {
    tag: "ESTADÍSTICAS",
    title: "Los números de la jornada 8: el equipo que sorprendió a todos",
    desc: "Tabla de posiciones, goleadores y los datos más llamativos de la fecha.",
    date: "Ayer",
    read: "4 min",
    cat: "",
  },
  {
    tag: "NOTA ESPECIAL",
    title: "Samuel, 11 años y ya lidera con la voz y con los pies",
    desc: "El mediocampista que sus entrenadores señalan como uno de los talentos más prometedores del departamento.",
    date: "Hace 3 días",
    read: "6 min",
    cat: "",
  },
  {
    tag: "GALERÍA",
    title: "32 fotos del entrenamiento táctico Sub-15",
    desc: "",
    date: "Hace 2 días",
    read: "",
    cat: "",
  },
  {
    tag: "ANÁLISIS",
    title: "¿Cuál es el equipo Sub-17 más en forma del mes?",
    desc: "",
    date: "Hace 5 días",
    read: "7 min",
    cat: "",
  },
];

const Noticias = () => (
  <section id="noticias" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-primary text-sm font-semibold mb-1">Noticias</p>
          <h2 className="font-bebas text-4xl md:text-5xl tracking-wider text-foreground">
            ÚLTIMAS NOTICIAS
          </h2>
        </div>
        <a href="#" className="text-primary text-sm hover:underline hidden md:inline">
          Ver todas →
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((n, i) => (
          <article
            key={i}
            className={`bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors ${
              i === 0 ? "md:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <span className="text-xs font-semibold text-primary tracking-widest">{n.tag}</span>
            <h3 className="font-bebas text-xl md:text-2xl mt-2 mb-2 text-foreground">{n.title}</h3>
            {n.desc && <p className="text-muted-foreground text-sm mb-3">{n.desc}</p>}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{n.date}</span>
              {n.read && <span>· {n.read}</span>}
              {n.cat && (
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{n.cat}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Noticias;
