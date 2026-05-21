import { useSearchParams } from 'react-router-dom';

export function Breadcrumbs() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  return (
    <nav aria-label="breadcrumb">
      <ol className="text-muted-foreground flex items-center gap-2">
        <li>УСЫ</li>
        {category && (
          <>
            /<li>{category}</li>
          </>
        )}
        {subcategory && (
          <>
            /<li>{subcategory}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
