import { Star } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useAddRatingMutation,
  useUpdateRatingMutation,
} from '@/api/ratings-api';
import { Button } from '@/components/ui/button';
import { useRating } from '@/hooks/use-rating';
import { cn } from '@/lib/utils';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function RateButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const { product } = useProductPageContext();
  const { user, isBoughtByUser, userRating } = useRating({
    productId: product.id,
  });

  const [addRating, { isLoading: isAddingRating }] = useAddRatingMutation();
  const [updateRating, { isLoading: isUpdatingRating }] =
    useUpdateRatingMutation();

  const [hoveredRating, setHoveredRating] = useState<number | null>(
    userRating?.rating ?? null,
  );

  const handleRatingClick = () => {
    if (!hoveredRating) return;
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (userRating) {
      updateRating({
        productId: product.id,
        rating: hoveredRating,
        ratingId: userRating.id,
      });
      return;
    }
    addRating({
      rating: hoveredRating,
      productId: product.id,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName[0]}.`,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    isBoughtByUser && (
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <p className="text-base">Оценить усы</p>
        <ul
          className="flex w-full justify-center gap-6 sm:justify-start sm:gap-0"
          onMouseLeave={() => setHoveredRating(userRating?.rating ?? null)}
        >
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Button
                key={i}
                className="h-8 w-8"
                disabled={isAddingRating || isUpdatingRating}
                size={'icon-xs'}
                type="button"
                variant={'link'}
                onClick={handleRatingClick}
                onMouseEnter={() => setHoveredRating(i + 1)}
              >
                <Star
                  className={cn('stroke-primary size-8 sm:size-6', {
                    'fill-primary': hoveredRating && i < hoveredRating,
                  })}
                />
              </Button>
            ))}
        </ul>
      </div>
    )
  );
}
