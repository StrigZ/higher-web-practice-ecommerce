import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuth } from '@/store/features/user/user-slice';

type Props = {
  children: React.ReactNode;
  access: 'auth' | 'guest' | 'any';
};
export function ProtectedRoute({ children, access }: Props) {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  if (isAuth && access === 'guest') {
    const from = location.state?.from ?? '/';
    return <Navigate replace to={from} />;
  }
  if (!isAuth && access === 'auth') {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
}
