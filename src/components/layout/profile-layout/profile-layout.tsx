import { Link, Outlet, useLocation } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const profileRoutes = [
  {
    url: '/profile',
    label: 'Мой профиль',
    match: ['/profile', '/profile/edit'],
  },
  { url: '/profile/orders', label: 'История заказов' },
  { url: '/profile/cart', label: 'Корзина' },
];

export function ProfileLayout() {
  const location = useLocation();

  return (
    <div className="flex h-full items-start gap-5 py-10">
      <aside>
        <nav>
          <ul className="flex flex-col gap-2 pr-4">
            {profileRoutes.map(({ url, label, match }) => (
              <li key={url}>
                <Link
                  className={cn('block rounded-sm px-4 py-2 text-base', {
                    'text-secondary bg-muted': (match ?? [url]).includes(
                      location.pathname,
                    ),
                  })}
                  to={url}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <Separator orientation="vertical" />
      <Outlet />
    </div>
  );
}
