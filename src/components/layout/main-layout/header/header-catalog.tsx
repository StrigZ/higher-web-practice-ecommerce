import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { productCategories } from '@/lib/constants';

export function HeaderCatalog() {
  return (
    <Popover>
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
            <li>
              <Link
                className="hover:text-secondary hover:bg-muted block w-full rounded-sm px-4 py-2 text-base"
                to={`/?category=${category}`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
