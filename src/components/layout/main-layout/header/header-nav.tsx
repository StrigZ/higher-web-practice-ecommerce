import { ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { cn } from '@/lib/utils';

export function HeaderNav({ className }: { className?: string }) {
  const location = useLocation();
  const { user } = useGetCurrentUser();

  return (
    <div
      className={cn(
        'flex h-10 flex-1 items-center justify-end gap-4 text-xs',
        className,
      )}
    >
      <Link className="nav-link" to={'/profile'}>
        <User
          className={cn({
            'fill-secondary text-secondary stroke-none':
              location.pathname === '/profile',
          })}
          size={16}
        />
        {user ? user.firstName : 'Войти'}
      </Link>
      {user ? (
        <Link className="nav-link" to={'/profile/cart'}>
          <ShoppingCart
            className={cn({
              'fill-secondary text-secondary stroke-none':
                location.pathname === '/profile/cart',
            })}
            size={16}
          />
          Корзина
        </Link>
      ) : (
        <Link
          className={buttonVariants({
            // мы переписываем дефолтные стили shadcn, поэтому
            // везде используется !important
            className:
              'h-full flex-1 px-4! py-2! text-base! font-bold! md:w-fit md:flex-none',
          })}
          to={'/register'}
        >
          Зарегистрироваться
        </Link>
      )}
    </div>
  );
}
