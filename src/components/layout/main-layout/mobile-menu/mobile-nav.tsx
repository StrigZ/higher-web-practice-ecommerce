import { House, Menu, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

export function MobileNav({ className }: { className?: string }) {
  return (
    <nav className={cn(className)}>
      <ul className="flex items-center justify-between">
        <Link
          className="flex flex-1 flex-col items-center justify-center gap-1 text-xs"
          to={'/'}
        >
          <House className="size-6" />
          Главная
        </Link>
        <Link
          className="flex flex-1 flex-col items-center justify-center gap-1 text-xs"
          to={'/'}
        >
          <Menu className="size-6" />
          Товары
        </Link>
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
