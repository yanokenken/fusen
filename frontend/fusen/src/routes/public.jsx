import { Navigate, Outlet } from "react-router-dom";
import Landing from "../features/misc/routes/Landing";
import Confirm from "../features/auth/routes/Confirm";
import Board from "../features/fusen/routes/Board";

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
		{path: "/demo", element: <Board />},
		{path: "/", element: <Landing />},
		{path: "/confirm", element: <Confirm />},
		{path: "*", element: <Navigate to="/" />}
	]
}];
