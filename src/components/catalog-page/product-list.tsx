import { ProductCard } from './product-card';

import { useProducts } from '@/hooks/use-products';

export function ProductList() {
  const { isLoading, products } = useProducts();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <ul className="bg-card grid grid-cols-4 grid-rows-3 gap-5 rounded-[12px] p-5">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}
