import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Publicidad = () => {
  const { data: anuncios } = useQuery({
    queryKey: ["publicidad"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publicidad")
        .select("*")
        .eq("activo", true)
        .order("orden", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (!anuncios || anuncios.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-dashed border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Espacio para publicidad</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {anuncios.map((anuncio, i) => (
            <motion.a
              key={anuncio.id}
              href={anuncio.enlace_url || "#"}
              target={anuncio.enlace_url ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              {anuncio.imagen_url ? (
                <img
                  src={anuncio.imagen_url}
                  alt={anuncio.titulo}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">{anuncio.titulo}</span>
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publicidad;
