import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FilterSidebar } from '../filter-sidebar/filter-sidebar';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function FiltersSheet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [initialParams, setInitialParams] = useState('');

  const handleOpen = (open: boolean) => {
    if (open) setInitialParams(searchParams.toString());
    setIsOpen(open);
  };

  const handleSheetClose = () => {
    setSearchParams(new URLSearchParams(initialParams));
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpen}>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant={'ghost'}>
          <SlidersHorizontal className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0" showCloseButton={false}>
        <SheetHeader className="flex flex-row items-center p-5">
          <Button variant={'ghost'} onClick={handleSheetClose}>
            <ArrowLeft />
          </Button>
          <SheetTitle className="font-heading text-2xl">Фильтры</SheetTitle>
        </SheetHeader>
        <FilterSidebar classNames="p-0" onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
