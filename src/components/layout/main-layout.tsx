import { Outlet } from 'react-router-dom';

import { Header } from './header/header';

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto h-[calc(100%-64px)]">
        <Outlet />
      </main>
    </>
  );
}
