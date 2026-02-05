import { Navigate, Outlet } from "react-router";
import { useTavernContext } from "../context/useContext";

const AccountLayout = () => {
  const { user, isLoading } = useTavernContext();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AccountLayout;
