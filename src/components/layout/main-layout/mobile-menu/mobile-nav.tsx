import { House, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { MobileCatalogSheet } from './mobile-catalog-sheet';

import { cn } from '@/lib/utils';

export function MobileNav({ className }: { className?: string }) {
  return (
    <nav className={cn('bg-white', className)}>
      <ul className="flex items-center justify-between">
        <Link
          className="flex flex-1 flex-col items-center justify-center gap-1 text-xs"
          to={'/'}
        >
          <House className="size-6" />
          Главная
        </Link>
        <MobileCatalogSheet />
        <Link
          className="flex flex-1 flex-col items-center justify-center gap-1 text-xs"
          to={'/profile'}
        >
          <User className="size-6" />
          Профиль
        </Link>
        <Link
          className="flex flex-1 flex-col items-center justify-center gap-1 text-xs"
          to={'/profile/cart'}
        >
          <ShoppingCart className="size-6" />
          Корзина
        </Link>
      </ul>
    </nav>
  );
}
