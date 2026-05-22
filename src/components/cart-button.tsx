import { ShoppingCart } from 'lucide-react';

import { Button } from './ui/button';

import { cn } from '@/lib/utils';

export function ShoppingCartButton({ className }: { className?: string }) {
  {
    /* TODO: make it work */
  }
  return (
    <Button className={cn('h-10 p-2', className)}>
      <ShoppingCart className="size-6" />
    </Button>
  );
}
