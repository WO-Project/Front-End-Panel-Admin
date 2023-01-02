import { lazy } from "react";

const PesananRoutes = [
  {
    path: "/wo/pesanan/edit/:id",
    component: lazy(() => import("../../../view/wo-pages/pesanan/form/update")),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pesanan/detail/:id",
    component: lazy(() => import("../../../view/wo-pages/pesanan/form/read")),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pesanan",
    component: lazy(() => import("../../../view/wo-pages/pesanan")),
    layout: "VerticalLayout",
  },
];

export default PesananRoutes;
