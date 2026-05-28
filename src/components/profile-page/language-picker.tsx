import { Field, FieldGroup, FieldLabel } from '../ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { userLanguages } from '@/lib/constants';
import type { User } from '@/types';
import type { UserLanguage } from '@/types/user';

const languageCodeToTextMap: Record<UserLanguage, string> = {
  en: 'Английский',
  ru: 'Русский',
};

export function LanguagePicker({
  lang,
  onChange,
}: {
  lang: User['language'];
  onChange: (lang: UserLanguage) => void;
}) {
  return (
    <FieldGroup className="w-45">
      <Field>
        <FieldLabel>Язык:</FieldLabel>
        <Select value={lang} onValueChange={onChange}>
          <SelectTrigger className="bg-card ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {userLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {languageCodeToTextMap[lang]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
