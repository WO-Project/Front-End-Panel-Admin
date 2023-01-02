import { lazy } from "react";

const GetAll = [
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

export default GetAll;
