import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { productCategories } from '@/lib/constants';
import type { ProductCategory } from '@/types';

export function HeaderCatalog() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category: ProductCategory) => {
    setIsOpen(false);
    navigate(`/?category=${category}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="h-full cursor-pointer rounded-sm px-4 py-2 text-base font-bold">
          Каталог
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle className="text-2xl font-bold">Категории</PopoverTitle>
        </PopoverHeader>
        <ul className="flex flex-col gap-2">
          {productCategories.map((category) => (
            <li key={category}>
              <Button
                className="hover:text-secondary w-full justify-start text-base"
                variant={'ghost'}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
