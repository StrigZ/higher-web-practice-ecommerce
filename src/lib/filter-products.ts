import type { Product } from '@/types';
import type { Filters } from '@/types/product';

export function filterProducts(
  products: Product[],
  filters: Filters,
): Product[] {
  const filtered = products.filter((product) => {
    if (
      filters.category &&
      product.characteristics['категория'] !== filters.category
    ) {
      return false;
    }
    if (
      filters.curliness &&
      product.characteristics['закрученность'] !== filters.curliness
    ) {
      return false;
    }
    if (
      filters.style &&
      !filters.style.split(',').includes(product.characteristics['стиль'])
    ) {
      return false;
    }
    if (
      filters.subcategory &&
      product.characteristics['подкатегория'] !== filters.subcategory
    ) {
      return false;
    }
    if (
      filters.thickness &&
      product.characteristics['густота'] !== filters.thickness
    ) {
      return false;
    }

    if (filters.inStock && !product.inStock) {
      return false;
    }

    if (filters.maxPrice && Number(product.price) > filters.maxPrice) {
      return false;
    }
    if (filters.minPrice && Number(product.price) < filters.minPrice) {
      return false;
    }

    if (
      filters.searchTerm &&
      !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
    )
      return false;

    return true;
  });

  if (!filters.sortBy) {
    return filtered;
  }

  switch (filters.sortBy) {
    case 'newest':
      return filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case 'price_asc':
      return filtered.sort((a, b) => Number(a.price) - Number(b.price));
    case 'price_desc':
      return filtered.sort((a, b) => Number(b.price) - Number(a.price));
    case 'rating':
      return filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
  }
}
