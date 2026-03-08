const categorias = [
  {
    name: "Categoría Sub-12",
    emoji: "⚽",
    stats: [
      { label: "Partidos jugados", value: "24" },
      { label: "Goles totales", value: "87" },
      { label: "Máximo goleador", value: "12" },
      { label: "Efectividad ofensiva", value: "78%" },
    ],
  },
  {
    name: "Categoría Sub-15",
    emoji: "🏋",
    stats: [
      { label: "Partidos jugados", value: "20" },
      { label: "Goles totales", value: "65" },
      { label: "Máximo goleador", value: "9" },
      { label: "Efectividad ofensiva", value: "65%" },
    ],
  },
  {
    name: "Categoría Sub-17",
    emoji: "🌟",
    stats: [
      { label: "Partidos jugados", value: "18" },
      { label: "Goles totales", value: "52" },
      { label: "Máximo goleador", value: "8" },
      { label: "Efectividad ofensiva", value: "71%" },
    ],
  },
];

const Estadisticas = () => (
  <section id="estadisticas" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-primary text-sm font-semibold mb-1">Estadísticas</p>
        <h2 className="font-bebas text-4xl md:text-5xl tracking-wider text-foreground">
          DATOS ACTUALIZADOS
        </h2>
        <a href="#" className="text-primary text-sm hover:underline">Ver tabla completa →</a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categorias.map((cat) => (
          <div key={cat.name} className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bebas text-2xl text-foreground mb-4">
              {cat.name} {cat.emoji}
            </h3>
            <div className="space-y-3">
              {cat.stats.map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="font-semibold text-primary text-lg">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Estadisticas;
