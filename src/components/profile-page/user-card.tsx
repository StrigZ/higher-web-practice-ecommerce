import { PersonStanding } from 'lucide-react';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { User } from '@/types';

export function UserCard(user: User) {
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col justify-between gap-6 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="border-secondary flex aspect-square h-20 items-center justify-center rounded-full border">
            <PersonStanding size={48} />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <Link
          className={buttonVariants({
            variant: 'outline',
            className: 'border-secondary! border bg-white',
          })}
          to={'/profile/edit'}
        >
          Редактировать
        </Link>
      </CardContent>
    </Card>
  );
}
