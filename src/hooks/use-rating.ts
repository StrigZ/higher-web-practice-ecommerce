import { useMemo } from 'react';

import { useGetCurrentUser } from './use-get-current-user';

import { useGetUserOrdersQuery } from '@/api/orders-api';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function useRating({ productId }: { productId: string }) {
  const { user } = useGetCurrentUser();
  const { data: orders } = useGetUserOrdersQuery(
    { userId: user ? user.id : '' },
    { skip: !user?.id },
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
    () => ratings.find(({ userId: id }) => id === user?.id),
    [ratings, user?.id],
  );

  return { user, userId: user?.id, isBoughtByUser, userRating };
}
