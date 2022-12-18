import { lazy } from "react";

import kelolaUser from "./KelolaUser";
import masterData from "./MasterData";
import kelolaProdukWO from "./KelolaProdukWO";
import KelolaArtikel from "./KelolaArtikel";
import WebsiteSettings from "./WebsiteSettings";
import commissionData from "./Komisi";
import KelolaKupon from "./KelolaKupon";

//! Type 3 = Wo
const PagesRoutes = [
  // Pages Kelola User
  ...kelolaUser,

  // Pages Master Data
  ...masterData,

  // pages Data Produk WO
  ...kelolaProdukWO,

  // pages Artikel
  ...KelolaArtikel,

  // pages Pengaturan Website
  ...WebsiteSettings,

  // pages komisi
  ...commissionData,

  // pages Kupon
  ...KelolaKupon,
];

export default PagesRoutes;
