import { Link } from 'react-router-dom';

import { ShoppingCartButton } from '../cart-button';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

export function ProductCard(
  props: Product & { layoutStyle: 'сетка' | 'список' },
) {
  const { layoutStyle, ...product } = props;
  const { images, name, price, id } = product;

  return (
    <Card
      className={cn({
        'flex flex-row items-center px-4': layoutStyle === 'список',
        'shadow-none ring-0': layoutStyle === 'сетка',
      })}
    >
      <Link
        className={cn('relative mx-auto w-full p-0', {
          'max-w-sm gap-y-2 rounded-none border-none p-0 shadow-none':
            layoutStyle === 'сетка',
          'flex flex-row gap-x-2 rounded-[12px]': layoutStyle === 'список',
        })}
        to={`/product/${id}`}
      >
        <img
          alt="обложка усов"
          className={cn('relative object-cover', {
            'aspect-video h-43 w-full': layoutStyle === 'сетка',
            'aspect-square h-20': layoutStyle === 'список',
          })}
          src={images[0]}
        />

        <CardHeader
          className={cn('gap-y-1 px-0', {
            '': layoutStyle === 'сетка',
            'flex flex-1 flex-row items-center justify-between':
              layoutStyle === 'список',
          })}
        >
          <CardTitle
            className={cn('font-normal', {
              'text-sm': layoutStyle === 'сетка',
              'text-secondary text-base': layoutStyle === 'список',
            })}
          >
            {name}
          </CardTitle>
          <CardDescription>
            <p
              className={cn('text-success font-heading font-bold', {
                'text-xl': layoutStyle === 'сетка',
                'pr-6 text-3xl': layoutStyle === 'список',
              })}
            >
              {price} ₽
            </p>
          </CardDescription>
        </CardHeader>
      </Link>

      <CardFooter className="p-0">
        <ShoppingCartButton
          className={cn('p-2', {
            'w-full': layoutStyle === 'сетка',
            'w-25': layoutStyle === 'список',
          })}
          product={product}
        />
      </CardFooter>
    </Card>
  );
}
