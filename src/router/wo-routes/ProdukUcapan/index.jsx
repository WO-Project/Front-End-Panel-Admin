import { lazy } from "react";

const ProdukUcapanRoutes = [
  {
    path: "/wo/produk-ucapan/create",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/produk-ucapan-user")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/produk-ucapan/detail/:id",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/produk-ucapan-user")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/produk-ucapan/edit/:id",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/produk-ucapan-user")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/produk-ucapan",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/produk-ucapan-user")
    ),
    layout: "VerticalLayout",
  },
];

export default ProdukUcapanRoutes;
