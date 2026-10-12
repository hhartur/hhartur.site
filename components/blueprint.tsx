/** Fundo fixo de prancheta: colunas da grade marcadas por linhas finas. */
export function Blueprint() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-background" aria-hidden="true">
      <div className="container grid h-full grid-cols-2 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-full border-l border-foreground/[0.05] last:border-r ${i > 1 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
