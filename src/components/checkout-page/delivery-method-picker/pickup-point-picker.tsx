import { Controller } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pickupPoints } from '@/lib/constants';

export function PickupPointPicker({ control }: { control }) {
  return (
    <Controller
      control={control}
      name="pickupPoint"
      render={({ field, fieldState }) => (
        <Field>
          <Select
            aria-invalid={fieldState.invalid}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="bg-card ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pickupPoints.map((point) => (
                  <SelectItem key={point.id} value={point.id}>
                    <p>{point.name}</p>{' '}
                    <p className="text-muted-foreground">{point.address}</p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
