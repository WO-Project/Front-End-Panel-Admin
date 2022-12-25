// import GetDetail from "./GetDetail";
// import Create from "./Create";
// import Update from "./Update";
// import GetAll from "./GetAll";
import { lazy } from "react";

export default [
  {
    path: "/admin/artikel/create",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel/form/create")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kategori-artikel/create",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel-kategori/form/create")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/artikel/update/:userid",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel/form/update/index")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kategori-artikel/update/:userid",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel-kategori/form/update/index")
    ),
    layout: "VerticalLayout",
  },

  {
    path: "/admin/artikel/detail/:userid",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel/form/read")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kategori-artikel/detail/:userid",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel-kategori/form/read")
    ),
    layout: "VerticalLayout",
  },

  {
    path: "/admin/artikel",
    component: lazy(() => import("../../../view/pages/artikel/artikel")),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kategori-artikel",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel-kategori")
    ),
    layout: "VerticalLayout",
  },
];
