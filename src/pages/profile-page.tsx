import { Link } from 'react-router-dom';

import { useUpdateUserMutation } from '@/api/users-api';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
import { LanguagePicker } from '@/components/profile-page/language-picker';
import { NotificationSettings } from '@/components/profile-page/notification-settings';
import { UserCard } from '@/components/profile-page/user-card';
import { buttonVariants } from '@/components/ui/button';
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
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-0">
        <h1 className="text-2xl font-bold sm:hidden">Мой профиль</h1>
        <UserCard {...user} />
        <LanguagePicker lang={user.language} onChange={handleChangeLanguage} />

        <NotificationSettings
          checked={user.notifyByEmail ?? false}
          onChange={handleChangeNotificationSettings}
        />

        <Link
          className={buttonVariants({
            variant: 'link',
            className: 'text-secondary! justify-start! px-0!',
          })}
          to={'/profile/orders'}
        >
          История заказов
        </Link>
      </div>
      <MobileMenu />
    </div>
  );
}
