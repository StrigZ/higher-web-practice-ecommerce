import { HeaderCatalog } from './header-catalog';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { HeaderSearchbar } from './header-search';

export function Header() {
  return (
    <header className="bg-card z-50 hidden shadow sm:flex">
      <div className="container mx-auto flex h-16 items-center gap-5 p-5 sm:px-0 sm:py-2 sm:pt-0 sm:pb-0">
        <div className="hidden h-10 w-70 items-center justify-between sm:flex">
          <HeaderLogo />
          <HeaderCatalog />
        </div>

        <HeaderSearchbar className="sm:max-w-142" />
        <HeaderNav className="hidden sm:flex" />
      </div>
    </header>
  );
}
