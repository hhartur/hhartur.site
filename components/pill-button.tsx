import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light";

const shell: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_12px_30px_-12px_hsl(var(--primary)/0.7)] hover:bg-primary/90",
  outline: "bg-transparent text-foreground ring-1 ring-foreground/15 hover:ring-foreground/30 hover:bg-foreground/[0.03]",
  light: "bg-foreground text-background hover:bg-foreground/90",
};

const bubble: Record<Variant, string> = {
  primary: "bg-primary-foreground/15 text-primary-foreground",
  outline: "bg-foreground/[0.06] text-foreground",
  light: "bg-background/15 text-background",
};

/** Botão em pílula com ícone aninhado em círculo próprio ("button-in-button"). */
export function PillButton({
  href,
  external = false,
  variant = "primary",
  icon: Icon = ArrowUpRight,
  size = "md",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: Variant;
  icon?: LucideIcon;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "group inline-flex select-none items-center justify-between gap-4 rounded-full font-medium tracking-tight transition-[background-color,box-shadow,transform] duration-500 ease-spring active:scale-[0.97]",
    size === "lg" ? "py-2 pl-6 pr-2 text-base" : "py-1.5 pl-5 pr-1.5 text-sm",
    shell[variant],
    className,
  );
  const inner = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105",
          size === "lg" ? "h-10 w-10" : "h-8 w-8",
          bubble[variant],
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
