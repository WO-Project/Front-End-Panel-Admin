import { lazy } from "react";

import PengantinRoutes from "./Pengantin";
import ProdukUcapanRoutes from "./ProdukUcapan";
import LinkOrderRoutes from "./LinkOrder";

const WORoutes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },

  {
    path: "/profile",
    component: lazy(() => import("../../view/wo-pages/profile")),
    layout: "VerticalLayout",
  },

  ...PengantinRoutes,

  ...ProdukUcapanRoutes,

  ...LinkOrderRoutes,

  {
    path: "/wo/pesanan",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/saldo-komisi",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/riwayat-komisi",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/pencairan-komisi",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },
];

export default WORoutes;
