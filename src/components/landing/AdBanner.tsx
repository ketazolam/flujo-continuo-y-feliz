import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AdBannerProps {
  posicion: string;
  className?: string;
}

const AdBanner = ({ posicion, className = "" }: AdBannerProps) => {
  const { data: anuncio } = useQuery({
    queryKey: ["ad_banner", posicion],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publicidad")
        .select("*")
        .eq("activo", true)
        .eq("posicion", posicion)
        .order("orden", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (!anuncio) return null;

  return (
    <div className={`my-6 flex flex-col items-center ${className}`}>
      <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-1.5 self-start sm:self-center">
        Sponsor
      </span>
      <a
        href={anuncio.enlace_url || "#"}
        target={anuncio.enlace_url ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="block rounded-lg overflow-hidden border border-border bg-primary/5 hover:border-primary/30 transition-colors
          w-[320px] h-[50px]
          sm:w-[728px] sm:h-[90px]"
      >
        {anuncio.imagen_url ? (
          <img
            src={anuncio.imagen_url}
            alt={anuncio.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium">{anuncio.titulo}</span>
          </div>
        )}
      </a>
    </div>
  );
};

export default AdBanner;
