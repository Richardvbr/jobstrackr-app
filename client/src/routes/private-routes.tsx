import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  //   const { authLogin } = /* some auth state provider */;

  //   if (authLogin === undefined) {
  //     return null; // or loading indicator/spinner/etc
  //   }

  const loggedIn = true;

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
