import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '@/api/products-api';
import { Button } from '@/components/ui/button';

export function ProductImageCarousel() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery(
    { productId: id! },
    { skip: !id },
  );

  const [displayImageIndex, setDisplayImageIndex] = useState<number | null>(
    null,
  );

  if (isLoading || !data) {
    return null;
  }

  const handlePreviousImageClick = () =>
    setDisplayImageIndex((pv) => {
      if (pv === null) return data.images.length - 1;

      return pv === 0 ? data.images.length - 1 : pv - 1;
    });

  const handleNextImageClick = () =>
    setDisplayImageIndex((pv) => {
      if (pv === null) return 1;

      return pv === data.images.length - 1 ? 0 : pv + 1;
    });

  return (
    <div className="grid grid-rows-[6fr_1fr] items-center justify-center">
      <img
        alt=""
        className="aspect-square h-full w-full"
        src={data.images[displayImageIndex ?? 0]}
      />
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <Button variant={'ghost'} onClick={handlePreviousImageClick}>
          <ChevronLeft />
        </Button>
        <ul className="grid grid-cols-4">
          {data.images.map((src) => (
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
