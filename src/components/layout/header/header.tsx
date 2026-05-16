import { HeaderCatalog } from './header-catalog';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { HeaderSearchbar } from './header-search';

export function Header() {
  return (
    <header className="container mx-auto flex items-center gap-5 py-2">
      <div className="flex h-10 w-[280px] items-center justify-between">
        <HeaderLogo />
        <HeaderCatalog />
      </div>

      <HeaderSearchbar />
      <HeaderNav />
    </header>
  );
}
