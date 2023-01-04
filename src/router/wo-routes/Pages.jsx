import { lazy } from "react";

import PengantinRoutes from "./Pengantin";
import ProdukUcapanRoutes from "./ProdukUcapan";
import LinkOrderRoutes from "./LinkOrder";
import PesananRoutes from "./Pesanan";
import KomisiRoutes from "./Komisi";

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

  ...PesananRoutes,

  ...KomisiRoutes,
];

export default WORoutes;
