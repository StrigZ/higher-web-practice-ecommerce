import { Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetUserOrdersQuery } from '@/api/orders-api';
import {
  useAddRatingMutation,
  useUpdateRatingMutation,
} from '@/api/ratings-api';
import { useGetUserByIdQuery } from '@/api/users-api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function RateButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [addRating] = useAddRatingMutation();
  const [updateRating] = useUpdateRatingMutation();
  const userId = useAppSelector(selectUserId);
  const { data: user } = useGetUserByIdQuery(
    { userId: userId! },
    { skip: !userId },
  );
  const { product, ratings } = useProductPageContext();
  const { data: orders } = useGetUserOrdersQuery(
    { userId: userId! },
    { skip: !userId },
  );

  const isBoughtByUser = useMemo(
    () =>
      (orders ?? [])
        .filter(({ userId: buyerId }) => buyerId === userId)
        .flatMap(({ items }) => items)
        .find(({ productId: targetId }) => targetId === product.id),
    [orders, product.id, userId],
  );
  const userRating = useMemo(
    () => ratings.find(({ userId: ratingOwnerId }) => ratingOwnerId === userId),
    [ratings, userId],
  );

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
      <ul
        className="flex"
        onMouseLeave={() => setHoveredRating(userRating?.rating ?? null)}
      >
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Button
              key={i}
              className="h-8 w-8"
              size={'icon-xs'}
              variant={'link'}
              onClick={handleRatingClick}
              onMouseEnter={() => setHoveredRating(i + 1)}
            >
              <Star
                className={cn('stroke-primary size-6', {
                  'fill-primary': hoveredRating && i < hoveredRating,
                })}
              />
            </Button>
          ))}
      </ul>
    )
  );
}
