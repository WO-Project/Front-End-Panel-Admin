import { lazy } from "react";

const kelolaProdukWO = [
  // update data
  {
    path: "/admin/produk-ucapan-user/edit/:id",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/produk-ucapan-user/form/update")
    ),
    layout: "VerticalLayout",
    type: 2
  },
  {
    path: "/admin/afiliasi-ucapan/edit/:id",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/afiliasi-ucapan/form/update")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/group-user/edit/:id",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/group-user/form/update")
    ),
    layout: "VerticalLayout",
  },

  // create data
  {
    path: "/admin/produk-ucapan-user/create",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/produk-ucapan-user/form/create")
    ),
    layout: "VerticalLayout",
    type: 2
  },
  {
    path: "/admin/afiliasi-ucapan/create",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/afiliasi-ucapan/form/create")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/group-user/create",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/group-user/form/create")
    ),
    layout: "VerticalLayout",
  },

  // get detail data
  {
    path: "/admin/group-user/:id",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/group-user/form/read")
    ),
    layout: "VerticalLayout",
    type: 2
  },
  {
    path: "/admin/produk-ucapan-user/detail/:id",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/produk-ucapan-user/form/read")
    ),
    layout: "VerticalLayout",
    type: 2
  },
  {
    path: "/admin/afiliasi-ucapan/:id",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/afiliasi-ucapan/form/read/index")
    ),
    layout: "VerticalLayout",
    type: 2
  },

  // get all data
  {
    path: "/admin/group-user",
    component: lazy(() => import("../../../view/pages/produk-wo/group-user")),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/produk-ucapan-user",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/produk-ucapan-user")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/afiliasi-ucapan",
    component: lazy(() =>
      import("../../../view/pages/produk-wo/afiliasi-ucapan")
    ),
    layout: "VerticalLayout",
  },
];

export default kelolaProdukWO;
