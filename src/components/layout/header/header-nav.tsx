import { ShoppingCart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { useGetUserByIdQuery } from '@/api/users-api';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { selectIsAuth, selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function HeaderNav() {
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector(selectUserId);

  const user = useGetUserByIdQuery({ userId: userId ?? '' }, { skip: !userId });

  return (
    <div className="flex h-10 flex-1 items-center justify-end gap-4 text-xs">
      <Link className="nav-link" to={'/profile'}>
        <User
          className={cn({
            'fill-secondary text-secondary': location.pathname === 'profile',
          })}
          size={16}
        />
        {isAuth ? user.data?.firstName : 'Войти'}
      </Link>
      {isAuth ? (
        <Link className="nav-link" to={'/cart'}>
          <ShoppingCart
            className={cn({
              'fill-secondary text-secondary': location.pathname === '/cart',
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
            className: 'h-full px-4! py-2! text-base! font-bold!',
          })}
          to={'/register'}
        >
          Зарегистрироваться
        </Link>
      )}
    </div>
  );
}
