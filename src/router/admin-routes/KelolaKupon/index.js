import { lazy } from "react";

export default [
  {
    path: "/admin/kupon/create",
    component: lazy(() => import("../../../view/pages/kupon/form/create")),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kupon/update/:id",
    component: lazy(() => import("../../../view/pages/kupon/form/update")),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kupon/:id",
    component: lazy(() => import("../../../view/pages/kupon/form/read")),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kupon",
    component: lazy(() => import("../../../view/pages/kupon")),
    layout: "VerticalLayout",
  },
];
