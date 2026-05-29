import { Outlet } from 'react-router-dom';

import { Header } from './header/header';
import { MobileMenu } from './mobile-menu/mobile-menu';

export function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="relative container mx-auto h-full flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <MobileMenu className="md:hidden" />
    </div>
  );
}
