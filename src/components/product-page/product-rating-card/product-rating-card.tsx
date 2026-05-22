import { ProductRatingList } from './product-rating-list';
import { RateButton } from './rate-button';

import { Card } from '@/components/ui/card';

export function ProductRatingCard() {
  return (
    <Card className="flex flex-col gap-5 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-base">Оценить усы</p>
        <RateButton />
      </div>
      <ProductRatingList />
    </Card>
  );
}
