import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductImageCarousel() {
  const { product } = useProductPageContext();
  const [displayImageIndex, setDisplayImageIndex] = useState<number | null>(
    null,
  );

  const handlePreviousImageClick = () =>
    setDisplayImageIndex((pv) => {
      if (pv === null) return product.images.length - 1;

      return pv === 0 ? product.images.length - 1 : pv - 1;
    });

  const handleNextImageClick = () =>
    setDisplayImageIndex((pv) => {
      if (pv === null) return 1;

      return pv === product.images.length - 1 ? 0 : pv + 1;
    });

  return (
    <div className="grid grid-rows-[6fr_1fr] items-center justify-center">
      <img
        alt=""
        className="aspect-square h-full w-full"
        src={product.images[displayImageIndex ?? 0]}
      />
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <Button variant={'ghost'} onClick={handlePreviousImageClick}>
          <ChevronLeft />
        </Button>
        <ul className="grid grid-cols-4">
          {product.images.map((src) => (
            <li key={src}>
              <img alt="" className="aspect-square object-cover" src={src} />
            </li>
          ))}
        </ul>
        <Button variant={'ghost'} onClick={handleNextImageClick}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
