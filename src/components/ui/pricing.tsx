import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#2d7a3a",
          "#52c464",
          "#1c2a1e",
          "#a3e635",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="w-full">
      <div className="text-center space-y-4 mb-10">
        <h2 className="font-bebas text-4xl md:text-5xl tracking-wider text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-10">
        <span className={cn("text-sm", isMonthly ? "text-foreground" : "text-muted-foreground")}>
          Por evento
        </span>
        <div className="flex items-center gap-2">
          <Label htmlFor="pricing-toggle" className="sr-only">
            Toggle pricing
          </Label>
          <Switch
            ref={switchRef}
            id="pricing-toggle"
            onCheckedChange={handleToggle}
          />
        </div>
        <span className={cn("text-sm", !isMonthly ? "text-foreground" : "text-muted-foreground")}>
          Paquete mensual (Ahorrá 20%)
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            className={cn(
              "relative rounded-2xl border bg-card p-6 text-left",
              plan.isPopular
                ? "border-primary shadow-lg shadow-primary/20 scale-105"
                : "border-border"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Popular
                </span>
              </div>
            )}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary tracking-widest">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  $<NumberFlow
                    value={parseInt(isMonthly ? plan.price : plan.yearlyPrice)}
                    format={{ useGrouping: true }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                <span className="text-sm text-muted-foreground">
                  / {plan.period}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {isMonthly ? "precio por evento" : "precio con paquete mensual"}
              </p>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <hr className="border-border" />

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: plan.isPopular ? "default" : "outline",
                  }),
                  "w-full"
                )}
              >
                {plan.buttonText}
              </a>
              <p className="text-xs text-center text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
