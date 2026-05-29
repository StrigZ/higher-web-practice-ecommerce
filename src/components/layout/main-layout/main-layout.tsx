import { Outlet } from 'react-router-dom';

import { Header } from './header/header';

export function MainLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="relative container mx-auto flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
