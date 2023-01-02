import { Grid7, Data, ShoppingBag, Bill, Moneys } from "iconsax-react";

const woNav = [
  {
    header: "MENU ADMIN WO",
    type: 3,
  },

  {
    id: "wo-dashboard",
    title: "Dashboard",
    icon: (
      <Grid7 size={18} variant="outline" set="curved" className="remix-icon" />
    ),
    navLink: "/dashboard",
  },

  {
    id: "wo-kelola-pengantin",
    title: "Data Pengantin",
    icon: <Data set="curved" className="remix-icon" size={18} />,
    navLink: "/wo/pengantin",
  },

  {
    id: "wo-produk",
    title: "Data Produk WO",
    icon: <Data set="curved" className="remix-icon" size={18} />,
    icon: <ShoppingBag set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "wo-produk-ucapan",
        title: "Produk Ucapan",
        navLink: "/wo/produk-ucapan",
      },
      {
        id: "wo-generate-link",
        title: "Generate Link Order",
        navLink: "/wo/link-order",
      },
    ],
  },

  {
    id: "wo-komisi",
    title: "Komisi WO",
    icon: <Moneys set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "wo-saldo-komisi",
        title: "Saldo Komisi",
        navLink: "/wo/saldo-komisi",
      },
      {
        id: "wo-riwayat-komisi",
        title: " Riwayat Komisi",
        navLink: "/wo/riwayat-komisi",
      },
      {
        id: "wo-pencairan-komisi",
        title: "Pencairan Komisi",
        navLink: "/wo/pencairan-komisi",
      },
    ],
  },

  {
    id: "wo-pesanan",
    title: "Pesanan",
    icon: <Bill set="curved" className="remix-icon" size={18} />,
    navLink: "/wo/pesanan",
  },
];

export default woNav;
