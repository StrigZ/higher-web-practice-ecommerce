import { cn } from '@/lib/utils';

export function Breadcrumbs({
  values,
  className,
}: {
  values: (string | null)[];
  className?: string;
}) {
  return (
    <nav aria-label="breadcrumb" className={cn(className)}>
      <ol className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
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
