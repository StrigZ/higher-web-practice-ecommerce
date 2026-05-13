import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <main
      className="test"
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
