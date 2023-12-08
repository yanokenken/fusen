import { Navigate, Outlet } from "react-router-dom";
import FusenBoard from "../features/fusen/routes/FusenBoard";
import Landing from "../features/misc/routes/Landing";


const App = () => {
  return (
		<>
		<Outlet />
		</>
  );
};

export const protectedRoutes = [{
	path: "/",
	element: <App />,
	children: [
		{path: "/board", element: <FusenBoard />},
		{path: "/", element: <Landing />},
		{path: "*", element: <Navigate to="/" />}
	]
}];

