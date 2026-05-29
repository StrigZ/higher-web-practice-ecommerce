import { ArrowLeft, ChevronRight, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useGetProducts } from '@/hooks/use-get-products';
import { productCategories } from '@/lib/constants';

export function MobileCatalogSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoading, products } = useGetProducts();
  const [level, setLevel] = useState<'root' | 'category' | 'subcategory'>(
    'root',
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const subcategories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            ?.filter((p) => p.characteristics['категория'] === selectedCategory)
            .map(({ characteristics }) => characteristics['подкатегория']),
        ),
      ) ?? [],
    [products, selectedCategory],
  );

  const getItemList = () => {
    switch (level) {
      case 'root': {
        return ['Усы'];
      }
      case 'category': {
        return productCategories;
      }
      case 'subcategory': {
        return subcategories;
      }
    }
  };

  const handleClick = (value: string) => {
    switch (level) {
      case 'root': {
        setSelectedCategory(value);
        setLevel('category');
        return;
      }
      case 'category': {
        setSelectedCategory(value);
        setLevel('subcategory');
        return;
      }
      case 'subcategory': {
        if (!selectedCategory) return;

        setIsOpen(false);
        setTimeout(() => {
          navigate(`/?category=${selectedCategory}&subcategory=${value}`);
          setSelectedCategory(null);
          setLevel('root');
        }, 300);
        return;
      }
    }
  };

  const handleGoBack = () => {
    switch (level) {
      case 'root': {
        return;
      }
      case 'category': {
        setSelectedCategory(null);
        setLevel('root');
        return;
      }
      case 'subcategory': {
        setLevel('category');
        return;
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-xs">
        <Menu className="size-6" />
        Товары
      </SheetTrigger>
      <SheetContent>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <div className="flex flex-col gap-3 px-2 py-12">
            {selectedCategory && (
              <Button
                className="text-foreground flex flex-row justify-start text-base font-bold"
                variant="link"
                onClick={handleGoBack}
              >
                <ArrowLeft />
                {selectedCategory}
              </Button>
            )}
            <ul className="px-2">
              {getItemList().map((category) => (
                <li key={`${category}`}>
                  <Button
                    className="flex w-full items-center justify-between"
                    variant={'ghost'}
                    onClick={() => handleClick(category)}
                  >
                    {category}
                    {level !== 'subcategory' && <ChevronRight />}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
