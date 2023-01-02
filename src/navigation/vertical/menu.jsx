import { Clipboard } from 'iconsax-react';
import { RiDashboard2Line } from 'react-icons/ri';

const company = [
  {
    header: "MENU",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Clipboard size={18} />,
    navLink: "/pages/dashboard",
  },
  {
    id: "master",
    title: "Master Data",
    icon: <RiDashboard2Line set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "wedding",
        title: "Data Wedding Organizer",
        navLink: "/pages/wedding",
      },
      {
        id: "pengantin",
        title: "Data Pengantin",
        navLink: "/pages/pengantin",
      },
      {
        id: "pelanggan",
        title: "Data Pelanggan",
        navLink: "/pages/customers",
      },
      {
        id: "produk",
        title: "Data Produk Ucapan Digital",
        navLink: "/pages/produk",
      },
      {
        id: "pesanan",
        title: "Data Pesanan",
        navLink: "/pages/pesanan",
      },
    ],
  },
  {
    id: "tabungan",
    title: "Inventory Tabung",
    icon: <RiDashboard2Line set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "data",
        title: "Data Tabung",
        navLink: "/data-tabung",
      },
      {
        id: "kategori",
        title: "Kategori",
        navLink: "/kategori-tabung",
      },
      {
        id: "harga",
        title: "Harga Pengisian",
        navLink: "/harga-isi",
      },
    ],
  },

];

export default company