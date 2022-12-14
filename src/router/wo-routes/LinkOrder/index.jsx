import { lazy } from "react";

const LinkOrderRoutes = [
  {
    path: "/wo/link-order/create",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/afiliasi-ucapan/form/create")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/link-order/edit/:id",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/afiliasi-ucapan/form/update")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/link-order/detail/:id",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/afiliasi-ucapan/form/read")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/wo/link-order",
    component: lazy(() =>
      import("../../../view/wo-pages/produk-wo/afiliasi-ucapan")
    ),
    layout: "VerticalLayout",
  },
];

export default LinkOrderRoutes;
