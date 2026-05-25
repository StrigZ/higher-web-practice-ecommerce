import { Link } from 'react-router-dom';

import LogoFull from '@/assets/Logo-Full.svg';
import LogoM from '@/assets/Logo-M.svg';

export function HeaderLogo() {
  return (
    <>
      <Link className="hidden md:block" to={'/'}>
        <img alt="" src={LogoFull} />
      </Link>
      <Link className="md:hidden" to={'/'}>
        <img alt="" src={LogoM} />
      </Link>
    </>
  );
}
