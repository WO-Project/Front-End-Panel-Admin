import { lazy } from "react";

const Update = [
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
];

export default Update;
