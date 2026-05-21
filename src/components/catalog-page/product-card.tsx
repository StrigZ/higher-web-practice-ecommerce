import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/types';

export function ProductCard({ images, name, price, id }: Product) {
  return (
    <Link to={`/product/${id}`}>
      <Card className="relative mx-auto w-full max-w-sm gap-y-2 border-none p-0 shadow-none ring-0">
        <img
          alt="обложка усов"
          className="relative z-20 aspect-video h-[172px] w-full object-cover"
          src={images[0]}
        />

        <CardHeader className="gap-y-1 px-0">
          <CardTitle className="text-sm font-normal">{name}</CardTitle>
          <CardDescription>
            <p className="text-success font-heading text-xl font-bold">
              {price} ₽
            </p>
          </CardDescription>
        </CardHeader>

        <CardFooter className="p-0">
          <Button className="h-10 w-full p-2">
            <ShoppingCart className="size-6" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
