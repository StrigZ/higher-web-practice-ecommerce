import { HeaderCatalog } from './header-catalog';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { HeaderSearchbar } from './header-search';

export function Header() {
  return (
    <header className="bg-card">
      <div className="container mx-auto flex h-16 items-center gap-5 px-5 pt-5 md:px-0 md:py-2 md:pt-0">
        <div className="hidden h-10 w-[280px] items-center justify-between md:flex">
          <HeaderLogo />
          <HeaderCatalog />
        </div>

        <HeaderSearchbar />
        <HeaderNav />
      </div>
    </header>
  );
}
