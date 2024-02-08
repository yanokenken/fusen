import { Navigate, Outlet } from "react-router-dom";
import Board from "../features/fusen/routes/Board";
import Setting from "../features/preference/routes/Setting";

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
		{path: "/setting", element: <Setting />},
		{path: "/", element: <Navigate to="/board" />},
		{path: "*", element: <Navigate to="/board" />}
	]
}];

