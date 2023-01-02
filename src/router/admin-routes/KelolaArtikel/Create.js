import { lazy } from "react";

const Create = [
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
];

export default Create;
