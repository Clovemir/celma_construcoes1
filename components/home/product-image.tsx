import {
  Building2,
  Paintbrush,
  Droplets,
  Zap,
  Wrench,
  Grid3X3,
  Palette,
  Package,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<number, LucideIcon> = {
  1: Building2,
  2: Paintbrush,
  3: Droplets,
  4: Zap,
  5: Wrench,
  6: Grid3X3,
  7: Palette,
};

const GRADIENT_MAP: Record<number, string> = {
  1: "from-slate-700 via-slate-800 to-slate-900",
  2: "from-amber-700 via-amber-800 to-amber-900",
  3: "from-blue-700 via-blue-800 to-blue-900",
  4: "from-yellow-600 via-yellow-700 to-yellow-900",
  5: "from-zinc-600 via-zinc-700 to-zinc-900",
  6: "from-stone-600 via-stone-700 to-stone-900",
  7: "from-violet-700 via-violet-800 to-violet-900",
};

const ICON_COLOR_MAP: Record<number, string> = {
  1: "text-slate-400",
  2: "text-amber-400",
  3: "text-blue-400",
  4: "text-yellow-400",
  5: "text-zinc-400",
  6: "text-stone-400",
  7: "text-violet-400",
};

interface ProductImageProps {
  categoryId: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProductImagePlaceholder({
  categoryId,
  className = "",
  size = "md",
}: ProductImageProps) {
  const Icon = ICON_MAP[categoryId] ?? Package;
  const gradient = GRADIENT_MAP[categoryId] ?? "from-slate-700 to-slate-900";
  const iconColor = ICON_COLOR_MAP[categoryId] ?? "text-slate-400";

  const iconSize = size === "sm" ? 24 : size === "lg" ? 48 : 32;

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 opacity-40">
        <Icon size={iconSize} className={iconColor} strokeWidth={1.5} />
      </div>
    </div>
  );
}
