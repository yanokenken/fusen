import { Navigate, Outlet } from "react-router-dom";
import Board from "../features/fusen/routes/Board";

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
		{path: "/", element: <Navigate to="/board" />},
		{path: "*", element: <Navigate to="/board" />}
	]
}];

