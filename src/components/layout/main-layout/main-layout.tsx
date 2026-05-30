import { Outlet } from 'react-router-dom';

import { Header } from './header/header';

export function MainLayout() {
  return (
    <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="relative container mx-auto flex-1 overflow-y-auto sm:max-w-295">
        <Outlet />
      </main>
    </div>
  );
}
