import { HeaderCatalog } from './header-catalog';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { HeaderSearchbar } from './header-search';

export function Header() {
  return (
    <header className="bg-card z-50 hidden shadow md:flex">
      <div className="container mx-auto flex h-16 items-center gap-5 p-5 md:px-0 md:py-2 md:pt-0 md:pb-0">
        <div className="hidden h-10 w-70 items-center justify-between md:flex">
          <HeaderLogo />
          <HeaderCatalog />
        </div>

        <HeaderSearchbar className="md:max-w-142" />
        <HeaderNav className="hidden md:flex" />
      </div>
    </header>
  );
}
