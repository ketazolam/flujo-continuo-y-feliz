import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Camera, Users, Radio } from "lucide-react";
import AdBanner from "@/components/landing/AdBanner";

const catIcons: Record<string, typeof Camera> = {
  "Cobertura 2026": Camera,
  "Comunidad": Users,
  "Alcance": Radio,
};

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

interface StatItem {
  id: string;
  categoria: string;
  label: string;
  value: string;
  suffix: string | null;
}

function StatCard({ cat, items, delay }: { cat: string; items: StatItem[]; delay: number }) {
  const Icon = catIcons[cat] || Camera;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
    >
      <h3 className="font-space font-bold uppercase text-xl text-foreground mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        Categoría {cat}
      </h3>
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <span className="font-semibold text-primary text-lg">
              <AnimatedNumber value={Number(s.value) || 0} suffix={s.suffix || ""} />
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const Estadisticas = () => {
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["estadisticas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("estadisticas").select("*").order("categoria");
      if (error) throw error;
      return data as StatItem[];
    },
  });

  const grouped = stats.reduce((acc, s) => {
    if (!acc[s.categoria]) acc[s.categoria] = [];
    acc[s.categoria].push(s);
    return acc;
  }, {} as Record<string, StatItem[]>);

  const entries = Object.entries(grouped);
  const split = Math.ceil(entries.length / 2);
  const firstHalf = entries.slice(0, split);
  const secondHalf = entries.slice(split);

  return (
    <section id="estadisticas" className="py-16 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary text-sm font-semibold mb-1 tracking-wider uppercase">Estadísticas</p>
          <h2 className="font-space font-bold uppercase text-4xl md:text-5xl tracking-wide text-foreground">
            DATOS ACTUALIZADOS
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No hay estadísticas disponibles</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {firstHalf.map(([cat, items], i) => (
                <StatCard key={cat} cat={cat} items={items} delay={i * 0.1} />
              ))}
            </div>

            {secondHalf.length > 0 && (
              <>
                <AdBanner posicion="estadisticas-entre-tablas" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {secondHalf.map(([cat, items], i) => (
                    <StatCard key={cat} cat={cat} items={items} delay={i * 0.1} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Estadisticas;
