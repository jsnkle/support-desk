import { useAuthStatus } from "hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "ui/Spinner";

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return <Spinner />;
	}

	return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
