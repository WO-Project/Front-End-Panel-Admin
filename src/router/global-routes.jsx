import { lazy } from "react";

const GlobalRoutes = [
  {
    path: "/admin/login",
    component: lazy(() => import("../view/pages/authenticationAdmin/Login")),
    layout: "FullLayout",
    noNeedAuth: true,
    type: 1,
  },

  {
    path: "/admin/blank-page",
    component: lazy(() => import("../view/pages/blank")),
    layout: "VerticalLayout",
    noNeedAuth: true,
  },

  {
    path: "/pages/error-404",
    component: lazy(() => import("../view/pages/errors/404")),
    layout: "FullLayout",
    noNeedAuth: true,
  },
];

export { GlobalRoutes };
