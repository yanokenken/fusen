import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import {isLoggedIn} from "../lib/auth"

export const AppRoutes = () => {
  console.log("isLoggedIn", isLoggedIn());
  const authed = isLoggedIn(); // todo 実際のチェック処理に置き換える
  const routes = authed ? protectedRoutes : publicRoutes;
  const element = useRoutes(routes);

  return <>{element}</>
};
