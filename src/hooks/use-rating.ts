import { useMemo } from 'react';

import { useGetUserOrdersQuery } from '@/api/orders-api';
import { useGetUserByIdQuery } from '@/api/users-api';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function useRating({ productId }: { productId: string }) {
  const userId = useAppSelector(selectUserId);
  const { data: user } = useGetUserByIdQuery(
    { userId: userId! },
    { skip: !userId },
  );
  const { data: orders } = useGetUserOrdersQuery(
    { userId: userId! },
    { skip: !userId },
  );
  const { ratings } = useProductPageContext();

  const isBoughtByUser = useMemo(
    () =>
      (orders ?? [])
        .flatMap(({ items }) => items)
        .find(({ productId: id }) => id === productId),
    [orders, productId],
  );

  const userRating = useMemo(
    () => ratings.find(({ userId: id }) => id === userId),
    [ratings, userId],
  );

  return { user, userId, isBoughtByUser, userRating };
}
