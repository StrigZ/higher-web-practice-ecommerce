export function Breadcrumbs({ values }: { values: (string | null)[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="text-muted-foreground flex items-center gap-2">
        {values.filter(Boolean).map((value) => (
          <li key={value} className="group">
            <span className="group-first:hidden">/ </span>
            {value}
          </li>
        ))}
      </ol>
    </nav>
  );
}
