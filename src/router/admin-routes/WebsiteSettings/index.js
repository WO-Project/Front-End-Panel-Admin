import { lazy } from "react";

export default [
  {
    path: "/admin/pengaturan-website",
    component: lazy(() => import("../../../view/pages/websiteSettings")),
    layout: "VerticalLayout",
  },
];
