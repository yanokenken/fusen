import { Navigate, Outlet } from "react-router-dom";
import FusenBoard from "../features/fusen/routes/FusenBoard";

export const publicRoutes = [
  {
    path: "/",
    element: <FusenBoard />,
  },
];
