import { lazy } from "react";

const GetDetail = [
  {
    path: "/admin/artikel/detail/:userid",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel/form/read")
    ),
    layout: "VerticalLayout",
  },
  {
    path: "/admin/kategori-artikel/:userid",
    component: lazy(() =>
      import("../../../view/pages/artikel/artikel-kategori/form/read")
    ),
    layout: "VerticalLayout",
  },
];

export default GetDetail;
