import { useState } from "react";

const filters = ["Todo", "Fotos", "Videos"];

const items = [
  { type: "Foto", emoji: "🎯", label: "Gol decisivo Sub-12" },
  { type: "Video", emoji: "▶", label: "Highlight Jornada 8" },
  { type: "Foto", emoji: "⚽", label: "Entrenamiento táctico" },
  { type: "Foto", emoji: "🏆", label: "Premiación torneo" },
  { type: "Video", emoji: "▶", label: "Resumen final Sub-17" },
  { type: "Foto", emoji: "🌟", label: "Jugador destacado" },
];

const Galeria = () => {
  const [filter, setFilter] = useState("Todo");

  const filtered = filter === "Todo" ? items : items.filter((i) => i.type === (filter === "Fotos" ? "Foto" : "Video"));

  return (
    <section id="galeria" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary text-sm font-semibold mb-1">Galería</p>
            <h2 className="font-bebas text-4xl md:text-5xl tracking-wider text-foreground">
              MOMENTOS CAPTURADOS
            </h2>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="aspect-square bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-xs text-primary">{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeria;
