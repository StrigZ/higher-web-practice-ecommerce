import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HeaderSearchbar() {
  return (
    <div className="group flex h-10 max-w-[568px] flex-1 items-center rounded-md">
      <Input
        className="border-primary h-full rounded-md rounded-r-none border-2 transition-colors placeholder:text-base focus-visible:ring-0"
        placeholder="Искать"
      />
      <Button className="group-focus-within:bg-secondary h-full shrink-0 rounded-l-none border-none px-6 transition-colors">
        <Search className="size-6" />
      </Button>
    </div>
  );
}
