import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Fragment>
      <nav>Navbar here</nav>

      <Outlet />
    </Fragment>
  );
};

export default MainLayout;
