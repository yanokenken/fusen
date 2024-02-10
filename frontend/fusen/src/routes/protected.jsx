import { Navigate, Outlet } from "react-router-dom";
import Board from "../features/fusen/routes/Board";
import Preference from "../features/preference/routes/Preference";

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
		{path: "/board", element: <Board />},
		{path: "/preference", element: <Preference />},
		{path: "/", element: <Navigate to="/board" />},
		{path: "*", element: <Navigate to="/board" />}
	]
}];

