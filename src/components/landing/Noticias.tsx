import { useState, useEffect, useCallback, Fragment } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Newspaper, X, AlertCircle, Image, Megaphone } from "lucide-react";
import AdBanner from "@/components/landing/AdBanner";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const SafeImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  if (error) return (
    <div className={`bg-secondary flex items-center justify-center ${className}`}>
      <Image size={32} className="text-muted-foreground" />
    </div>
  );
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

const NoticiaModal = ({ noticia, onClose }: { noticia: any; onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const dateStr = noticia.fecha
    ? new Date(noticia.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-card rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/60 text-foreground hover:bg-background/90 transition-colors"
          >
            <X size={20} />
          </button>

          {noticia.imagen_url && (
            <div className="w-full h-56 sm:h-72">
              <SafeImage src={noticia.imagen_url} alt={noticia.titulo} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 h-56 sm:h-72 bg-gradient-to-b from-transparent to-card/80 pointer-events-none" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {noticia.tag && (
                <span className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full tracking-wider">
                  {noticia.tag}
                </span>
              )}
              {noticia.categoria && (
                <span className="text-xs font-medium bg-accent/20 text-accent px-3 py-1 rounded-full">
                  {noticia.categoria}
                </span>
              )}
              {dateStr && <span className="text-xs text-muted-foreground ml-auto">{dateStr}</span>}
            </div>

            <h2 className="font-space font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              {noticia.titulo}
            </h2>

            {noticia.descripcion && (() => {
              const parrafos = noticia.descripcion.split(/\n\n+/).filter(Boolean);
              return (
                <div className="space-y-4 text-foreground/80 text-base leading-relaxed">
                  {parrafos.map((p: string, i: number) => (
                    <Fragment key={i}>
                      <p className="whitespace-pre-line">{p}</p>
                      {i === 1 && <AdBanner posicion="articulo-inicio" className="my-2" />}
                    </Fragment>
                  ))}
                </div>
              );
            })()}

            <AdBanner posicion="articulo-final" className="mt-6" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const AdEntreNoticias = ({ anuncio }: { anuncio: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="col-span-1 sm:col-span-2 lg:col-span-4"
  >
    <a
      href={anuncio.enlace_url || "#"}
      target={anuncio.enlace_url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden group border border-border hover:border-primary/40 transition-colors"
    >
      {anuncio.imagen_url ? (
        <img
          src={anuncio.imagen_url}
          alt={anuncio.titulo}
          className="w-full h-24 sm:h-28 object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-24 sm:h-28 bg-card flex items-center justify-center">
          <span className="text-foreground font-medium">{anuncio.titulo}</span>
        </div>
      )}
      <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-muted-foreground bg-background/70 px-2 py-0.5 rounded-full">
        <Megaphone size={10} /> Publicidad
      </span>
    </a>
  </motion.div>
);

const Noticias = () => {
  const [selectedNoticia, setSelectedNoticia] = useState<any | null>(null);

  const { data: noticias = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["noticias"],
    queryFn: async () => {
      const { data, error } = await supabase.from("noticias").select("*").order("fecha", { ascending: false }).limit(5);
      if (error) throw error;
      return data;
    },
    retry: 2,
  });

  const { data: adsEntreNoticias = [] } = useQuery({
    queryKey: ["publicidad_entre_noticias"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publicidad")
        .select("*")
        .eq("activo", true)
        .eq("posicion", "entre_noticias")
        .order("orden", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const timeAgo = (date: string) => {
    try { return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es }); } catch { return ""; }
  };

  const closeModal = useCallback(() => setSelectedNoticia(null), []);

  return (
    <section id="noticias" className="py-16 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8 md:mb-12"
        >
          <div>
            <p className="text-primary text-sm font-semibold mb-1 tracking-wider uppercase">Noticias</p>
            <h2 className="font-space font-bold uppercase text-3xl md:text-5xl tracking-wide text-foreground">
              ÚLTIMAS NOTICIAS
            </h2>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : isError ? (
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Error al cargar las noticias</p>
            <button onClick={() => refetch()} className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90">Reintentar</button>
          </div>
        ) : noticias.length === 0 ? (
          <div className="text-center py-16">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay noticias publicadas aún</p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            <motion.article
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl mb-8 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedNoticia(noticias[0])}
            >
              {noticias[0].imagen_url ? (
                <div className="relative h-48 sm:h-64 md:h-80">
                  <SafeImage src={noticias[0].imagen_url} alt={noticias[0].titulo} className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <span className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full tracking-wider">{noticias[0].tag}</span>
                      {noticias[0].categoria && <span className="text-xs font-medium bg-accent/20 text-accent px-3 py-1 rounded-full">{noticias[0].categoria}</span>}
                    </div>
                    <h3 className="font-space font-bold text-xl md:text-3xl mb-2 md:mb-3 text-foreground">{noticias[0].titulo}</h3>
                    {noticias[0].descripcion && <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4 max-w-3xl line-clamp-2 md:line-clamp-none">{noticias[0].descripcion}</p>}
                    <span className="text-xs text-muted-foreground">{timeAgo(noticias[0].fecha)}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl p-5 md:p-10 hover:border-primary/50 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full tracking-wider">{noticias[0].tag}</span>
                      {noticias[0].categoria && <span className="text-xs font-medium bg-accent/20 text-accent px-3 py-1 rounded-full">{noticias[0].categoria}</span>}
                    </div>
                    <h3 className="font-space font-bold text-xl md:text-3xl mb-3 text-foreground group-hover:text-primary transition-colors">{noticias[0].titulo}</h3>
                    {noticias[0].descripcion && <p className="text-muted-foreground text-sm md:text-base mb-4 max-w-3xl">{noticias[0].descripcion}</p>}
                    <span className="text-xs text-muted-foreground">{timeAgo(noticias[0].fecha)}</span>
                  </div>
                </div>
              )}
            </motion.article>

            {/* Grid */}
            {noticias.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {noticias.slice(1).map((n, i) => (
                  <Fragment key={n.id}>
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group"
                      onClick={() => setSelectedNoticia(n)}
                    >
                      {n.imagen_url && (
                        <SafeImage src={n.imagen_url} alt={n.titulo} className="w-full h-36 object-cover" />
                      )}
                      <div className="p-4 md:p-6">
                        <span className="inline-block text-[10px] font-semibold text-primary-foreground bg-primary/80 px-2.5 py-0.5 rounded-full tracking-wider mb-3">{n.tag}</span>
                        <h3 className="font-space font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors leading-snug">{n.titulo}</h3>
                        {n.descripcion && <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{n.descripcion}</p>}
                        <span className="text-xs text-muted-foreground">{timeAgo(n.fecha)}</span>
                      </div>
                    </motion.article>
                    {i === 1 && adsEntreNoticias[0] && (
                      <AdEntreNoticias anuncio={adsEntreNoticias[0]} />
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {selectedNoticia && <NoticiaModal noticia={selectedNoticia} onClose={closeModal} />}
    </section>
  );
};

export default Noticias;
