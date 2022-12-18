import { lazy } from "react";

const commissionData = [
  //Read
  {
    path: "/admin/riwayat-komisi-admin/detail/:userid",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-admin/form/read"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/riwayat-komisi-wo/detail/:userid",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-wo/form/read"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/riwayat-pencairan-komisi-wo/detail/:userid",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-pencairan/form/read"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/riwayat-pencairan-komisi-wo/detail/:userid",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-pencairan/form/read"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/pencairan-komisi/detail/:userid",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/pencairan/form/read"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },
  //Update
  {
    path: "/admin/pencairan-komisi/edit/:userid",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/pencairan/form/update"
      )
    ),
    layout: "VerticalLayout",
  },

  //Get All
  {
    path: "/admin/riwayat-komisi-admin",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-admin"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/riwayat-komisi-wo",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-wo"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/riwayat-pencairan-komisi-wo",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/riwayat-pencairan"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/saldo-komisi-wo",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/saldo-komisi"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },

  {
    path: "/admin/pencairan-komisi",
    component: lazy(() =>
      import(
        "../../../view/pages/komisi/pencairan"
      )
    ),
    layout: "VerticalLayout",
    type: 2
  },
]

export default commissionData