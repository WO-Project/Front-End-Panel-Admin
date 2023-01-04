import { lazy } from "react";

const KomisiRoutes = [
  {
    path: "/wo/saldo-komisi",
    component: lazy(() => import("../../../view/wo-pages/komisi/saldo-komisi")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/riwayat-komisi",
    component: lazy(() =>
      import("../../../view/wo-pages/komisi/riwayat-komisi")
    ),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/pencairan-komisi",
    component: lazy(() =>
      import("../../../view/wo-pages/komisi/riwayat-pencairan")
    ),
    layout: "VerticalLayout",
  },
];

export default KomisiRoutes;
