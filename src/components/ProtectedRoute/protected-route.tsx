import { Navigate, useLocation } from "react-router";
import { FC, ReactElement } from "react";
import { useSelectorHook } from "../services/store/hooks";
import { ROUTE } from "../utils/constants";

interface TProtectedProps {
  component: ReactElement;
  onlyUnAuth?: boolean;
}

const Protected: FC<TProtectedProps> = ({ component, onlyUnAuth = false }) => {
  const isAuthChecked = useSelectorHook((store) => store.user.isAuthChecked);
  const user = useSelectorHook((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) return null;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: ROUTE.main } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate to={`/${ROUTE.mainLayout.login}`} state={{ from: location }} />
    );
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
  <Protected onlyUnAuth={true} component={component} />
);
