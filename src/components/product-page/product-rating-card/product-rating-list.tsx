import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Star } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductRatingList() {
  const { ratings } = useProductPageContext();

  return (
    <ul className="flex flex-col gap-5">
      {ratings.length > 0 ? (
        ratings.map(({ rating, userName, createdAt }) => (
          <li key={userName} className="flex flex-col gap-5">
            <Separator />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <ul className="flex items-center">
                  {Array(rating)
                    .fill(<Star className="fill-primary size-5 stroke-none" />)
                    .map((star, i) => (
                      <li key={i}>{star}</li>
                    ))}
                  {Array(5 - rating)
                    .fill(<Star className="stroke-primary size-4 fill-none" />)
                    .map((star, i) => (
                      <li key={i}>{star}</li>
                    ))}
                </ul>
                <p className="text-base font-bold">{rating}.0</p>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <p className="text-base">{userName}</p>
                <p className="text-muted-foreground text-xs">
                  {format(createdAt, "d MMMM yyyy 'г.'", {
                    locale: ru,
                  })}
                </p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p>Не отзывов</p>
      )}
    </ul>
  );
}
