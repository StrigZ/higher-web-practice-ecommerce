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
    <div className="flex grid-rows-[6fr_1fr] flex-col items-center justify-center sm:grid">
      <div className="flex items-center justify-center">
        <Button
          className="sm:hidden"
          variant={'ghost'}
          onClick={handlePreviousImageClick}
        >
          <ChevronLeft />
        </Button>
        <img
          alt=""
          className="aspect-square h-[288px] flex-1 sm:h-full"
          src={product.images[displayImageIndex ?? 0]}
        />
        <Button
          className="sm:hidden"
          variant={'ghost'}
          onClick={handleNextImageClick}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="hidden grid-cols-[auto_1fr_auto] items-center gap-2 sm:grid">
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
