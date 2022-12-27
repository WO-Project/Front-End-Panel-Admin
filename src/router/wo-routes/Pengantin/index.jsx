import { lazy } from "react";

const PengantinRoutes = [
  {
    path: "/wo/pengantin/create",
    component: lazy(() =>
      import("../../../view/wo-pages/pengantin/form/create")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pengantin/detail/:id",
    component: lazy(() => import("../../../view/wo-pages/pengantin/form/read")),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pengantin/edit/:id",
    component: lazy(() =>
      import("../../../view/wo-pages/pengantin/form/update")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/pengantin",
    component: lazy(() => import("../../../view/wo-pages/pengantin/index")),
    layout: "VerticalLayout",
  },
];

export default PengantinRoutes;
