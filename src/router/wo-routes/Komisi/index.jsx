import { lazy } from "react";

const KomisiRoutes = [
  {
    path: "/wo/saldo-komisi/request",
    component: lazy(() =>
      import("../../../view/wo-pages/komisi/saldo-komisi/form/update/Request")
    ),
    layout: "VerticalLayout",
  },

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
    path: "/wo/pencairan-komisi/detail/:id",
    component: lazy(() =>
      import(
        "../../../view/wo-pages/komisi/saldo-komisi/form/read/RiwayatPencairan"
      )
    ),
    layout: "VerticalLayout",
  },
];

export default KomisiRoutes;
