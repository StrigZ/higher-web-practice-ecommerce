import { useUpdateUserMutation } from '@/api/users-api';
import { LanguagePicker } from '@/components/profile-page/language-picker';
import { NotificationSettings } from '@/components/profile-page/notification-settings';
import { UserCard } from '@/components/profile-page/user-card';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import type { UserLanguage } from '@/types/user';

export function ProfilePage() {
  const { user } = useGetCurrentUser();
  const [updateUser] = useUpdateUserMutation();

  if (!user) {
    return <p>loading...</p>;
  }

  const handleChangeLanguage = (lang: UserLanguage) =>
    updateUser({ userId: user.id, data: { ...user, language: lang } });

  const handleChangeNotificationSettings = (checked: boolean) =>
    updateUser({
      userId: user.id,
      data: { ...user, notifyByEmail: checked },
    });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <UserCard {...user} />
      <LanguagePicker lang={user.language} onChange={handleChangeLanguage} />

      <NotificationSettings
        checked={user.notifyByEmail ?? false}
        onChange={handleChangeNotificationSettings}
      />
    </div>
  );
}
