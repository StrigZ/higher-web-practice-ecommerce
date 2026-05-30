import { Link } from 'react-router-dom';

import LogoFull from '@/assets/Logo-Full.svg';
import LogoM from '@/assets/Logo-M.svg';

export function HeaderLogo() {
  return (
    <>
      <Link className="hidden sm:block" to={'/'}>
        <img alt="" src={LogoFull} />
      </Link>
      <Link className="sm:hidden" to={'/'}>
        <img alt="" src={LogoM} />
      </Link>
    </>
  );
}
