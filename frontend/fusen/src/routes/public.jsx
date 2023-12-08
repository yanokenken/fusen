import { Navigate, Outlet } from "react-router-dom";
import Landing from "../features/misc/routes/Landing";
import Register from "../features/auth/routes/Register";
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
		{path: "/board", element: <FusenBoard isDemo={true} />},
		{path: "/", element: <Landing />},
		{path: "/register", element: <Register />},
		{path: "*", element: <Navigate to="/" />}
	]
}];
