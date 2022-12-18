import { lazy } from "react";

const WORoutes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/profile",
    component: lazy(() => import("../../view/wo-pages/profile")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/pengantin",
    component: lazy(() => import("../../view/wo-pages/pengantin")),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/produk-ucapan",
    component: lazy(() =>
      import("../../view/wo-pages/produk-wo/produk-ucapan-user")
    ),
    layout: "VerticalLayout",
  },

  {
    path: "/wo/link-order",
    component: lazy(() =>
      import("../../view/wo-pages/produk-wo/afiliasi-ucapan")
    ),
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

  {
    path: "/wo/pesanan",
    component: lazy(() => import("../../view/wo-pages/dashboard")),
    layout: "VerticalLayout",
  },
];

export default WORoutes;
