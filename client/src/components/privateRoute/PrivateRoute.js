import { Fragment } from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}

export default PrivateRoute;
