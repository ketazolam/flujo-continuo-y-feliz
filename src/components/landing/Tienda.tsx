import { useState } from "react";
import ShopModal from "./ShopModal";

const filters = ["Todo", "Fotos", "Videos", "Packs"];

const productos = [
  { type: "FOTO", title: "Fotos Partido — Final Sub-12", details: "45 fotos · Alta resolución · Digital", price: "$8.000", cat: "Fotos" },
  { type: "VIDEO", title: "Highlight Jornada 8", details: "8 min · Full HD · Digital", price: "$12.000", cat: "Videos" },
  { type: "PACK", title: "Pack Familia — Fotos + Video", details: "Fotos + Video · Digital", price: "$18.000", cat: "Packs" },
  { type: "FOTO", title: "Retrato Individual", details: "1 foto · 4K · Digital", price: "$5.000", cat: "Fotos" },
  { type: "VIDEO", title: "Video Torneo Sub-17", details: "45 min · Full HD · Digital", price: "$20.000", cat: "Videos" },
  { type: "PACK", title: "Pack Completo Torneo", details: "Todas las fotos + videos · Digital", price: "$45.000", cat: "Packs" },
];

const Tienda = () => {
  const [filter, setFilter] = useState("Todo");
  const [selected, setSelected] = useState<typeof productos[0] | null>(null);

  const filtered = filter === "Todo" ? productos : productos.filter((p) => p.cat === filter);

  return (
    <section id="tienda" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-primary text-sm font-semibold mb-1">Tienda</p>
          <h2 className="font-bebas text-4xl md:text-5xl tracking-wider text-foreground">
            📷 LLEVATE EL RECUERDO EN ALTA CALIDAD
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Fotos profesionales y videos completos de los partidos de tu hijo. Descarga digital inmediata tras confirmar el pago por WhatsApp.
          </p>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <span className="text-xs font-semibold text-primary tracking-widest">{p.type}</span>
              <h3 className="font-bebas text-xl mt-2 mb-1 text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.details}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{p.price}</span>
                <button
                  onClick={() => setSelected(p)}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ShopModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Tienda;
