import { useGetUserByIdQuery } from '@/api/users-api';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function useGetCurrentUser() {
  const userId = useAppSelector(selectUserId);
  const { data: user } = useGetUserByIdQuery(
    { userId: userId! },
    { skip: !userId },
  );

  return {
    userId,
    user,
  };
}
