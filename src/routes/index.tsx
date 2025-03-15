import { RouteObject } from "react-router-dom";
import Configuracoes from "../features/perfil/pages/Configuracoes";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/configuracoes",
    element: <Configuracoes />,
  },
];

export const publicRoutes: RouteObject[] = [];
