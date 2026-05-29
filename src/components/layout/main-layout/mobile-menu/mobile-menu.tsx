import { HeaderNav } from '../header/header-nav';

import { MobileNav } from './mobile-nav';

import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { cn } from '@/lib/utils';

export function MobileMenu({ className }: { className?: string }) {
  const { user } = useGetCurrentUser();

  return (
    <div
      className={cn(
        'sticky bottom-0 z-50 h-14 border-t bg-white px-5 py-2 shadow md:hidden',
        className,
      )}
    >
      {user ? <MobileNav /> : <HeaderNav className="h-full justify-start" />}
    </div>
  );
}
