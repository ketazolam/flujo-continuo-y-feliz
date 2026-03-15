import { useState } from "react";
import { Image } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

const SafeImage = ({ src, alt, className = "", loading = "lazy" }: SafeImageProps) => {
  const [error, setError] = useState(false);
  if (error)
    return (
      <div className={`bg-secondary flex items-center justify-center ${className}`}>
        <Image size={24} className="text-muted-foreground" />
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
