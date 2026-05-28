import { Checkbox } from '../ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '../ui/field';

export function NotificationSettings({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <FieldGroup>
      <Field className="gap-2" orientation="horizontal">
        <Checkbox
          checked={checked}
          id="notification-checkbox"
          name="notification-checkbox"
          onCheckedChange={onChange}
        />
        <FieldLabel htmlFor="notification-checkbox">
          Уведомлять об изменении статуса заказов по email
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
