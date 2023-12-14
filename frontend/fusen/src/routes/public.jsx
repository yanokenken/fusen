import { Navigate, Outlet } from "react-router-dom";
import Landing from "../features/misc/routes/Landing";
import Confirm from "../features/auth/routes/Confirm";
import FusenBoard from "../features/fusen/routes/FusenBoard";

const App = () => {
  return (
		<>
		<Outlet />
		</>
  );
};

export const publicRoutes = [{
	path: "/",
	element: <App />,
	children: [
		{path: "/demo", element: <FusenBoard isDemo={true} />},
		{path: "/", element: <Landing />},
		{path: "/confirm", element: <Confirm />},
		{path: "*", element: <Navigate to="/" />}
	]
}];
