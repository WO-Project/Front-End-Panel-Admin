import { lazy } from "react";

const PesananRoutes = [
  {
    path: "/wo/pesanan/create",
    component: lazy(() => import("../../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pesanan/edit/:id",
    component: lazy(() => import("../../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pesanan/detail/:id",
    component: lazy(() => import("../../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pesanan",
    component: lazy(() => import("../../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },
];

export default PesananRoutes;
