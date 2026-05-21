import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  query: z.string().min(1, 'Запрос не может быть пустым.').trim(),
});

export function HeaderSearchbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchParams.get('search') ?? '',
    },
    mode: 'onSubmit',
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { query } = data;
    setSearchParams((searchParams) => {
      searchParams.set('search', query);
      return searchParams;
    });
  }

  return (
    <form
      className="group relative flex h-10 max-w-142 flex-1 items-center rounded-md"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Input
        {...form.register('query')}
        aria-invalid={!!form.formState.errors.query}
        autoComplete="off"
        className="border-primary h-full rounded-md rounded-r-none border-2 transition-colors placeholder:text-base focus-visible:ring-0"
        placeholder="Искать"
      />
      {form.formState.errors.query && (
        <FieldError
          className="absolute -bottom-6"
          errors={[form.formState.errors.query]}
        />
      )}

      <Button
        className="group-focus-within:bg-secondary h-full shrink-0 rounded-l-none border-none px-6 transition-colors"
        type="submit"
      >
        <Search className="size-6" />
      </Button>
    </form>
  );
}
