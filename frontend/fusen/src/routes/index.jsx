import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {

  const authed = true; // todo 実際のチェック処理に置き換える
  const routes = authed ? protectedRoutes : publicRoutes;
  const element = useRoutes(routes);

  return <>{element}</>
};
