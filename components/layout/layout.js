import { Fragment } from 'react';
import MainHeader from 'components/layout/main-header';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
