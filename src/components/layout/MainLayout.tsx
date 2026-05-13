import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <main
      className="flex items-center justify-center bg-red-500"
      id="test"
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: 16,
      }}
    >
      <Outlet />
    </main>
  );
}
