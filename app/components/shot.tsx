import Image from "next/image";

// A real product screenshot. object-contain on a subtle inset so the whole UI shows without
// cropping; next/image avoids layout shift. Alt text is required.
export function Shot({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface-2 shadow-xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain p-3"
      />
    </div>
  );
}
