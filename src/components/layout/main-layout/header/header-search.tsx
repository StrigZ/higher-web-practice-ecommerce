import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  query: z.string(),
});

export function HeaderSearchbar({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchParams.get('search') ?? '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { query } = data;

    setSearchParams((searchParams) => {
      if (query) {
        searchParams.set('search', query);
      } else {
        searchParams.delete('search');
      }
      return searchParams;
    });
  }

  return (
    <form
      className={cn(
        'group relative flex h-10 items-center rounded-md',
        className,
      )}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Search className="text-muted-foreground absolute left-2 size-4 md:hidden" />
      <Input
        {...form.register('query')}
        aria-invalid={!!form.formState.errors.query}
        autoComplete="off"
        className="border-primary h-full rounded-md border-2 pl-8 transition-colors placeholder:text-sm focus-visible:ring-0 md:rounded-r-none md:pl-2 md:placeholder:text-base"
        placeholder="Искать"
      />

      <Button
        className="group-focus-within:bg-secondary hidden h-full shrink-0 rounded-l-none border-none px-6 transition-colors md:flex"
        type="submit"
      >
        <Search className="size-6" />
      </Button>
    </form>
  );
}
