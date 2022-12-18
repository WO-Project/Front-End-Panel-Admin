import {
  UserEdit,
  Grid7,
  PercentageSquare,
  Notification,
  Data,
  ShoppingBag,
  Moneys,
  Notepad2,
  DocumentCode,
} from "iconsax-react";
import { GoDatabase } from "react-icons/go";
import { FaUsersCog, FaMoneyBill } from "react-icons/fa";
import { GiPaperBagOpen } from "react-icons/gi";
import { MdWeb } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";

const adminNav = [
  {
    header: "MENU SUPER ADMIN",
    type: 1,
  },

  // navlink harus 2 path

  /**
   * Dashboard
   */
  {
    id: "dashboard",
    title: "Dashboard",
    icon: (
      <Grid7 size={18} variant="outline" set="curved" className="remix-icon" />
    ),
    navLink: "/dashboard",
  },

  /**
   * Kelola User
   * 1. CRUD User
   * 2. Atur Role User (Admin / Staff / WO / Pelanggan)
   * 3. Role & Permission User
   */
  {
    id: "kelola-user",
    title: "Kelola User",
    icon: (
      <UserEdit
        set="curved"
        variant="outline"
        className="remix-icon"
        size={18}
      />
    ),
    children: [
      {
        id: "crud-user",
        title: "Kelola Data User",
        navLink: "/admin/crud-user",
      },
      {
        id: "atur-role",
        title: "Kelola Role User",
        navLink: "/admin/atur-role",
      },
    ],
  },

  /**
   * Master Data
   * 1. CRUD WO
   * 2. CRUD Pengantin
   * 3. CRUD Customer WO
   * 4. CRUD Ucapan Digital
   */
  {
    id: "master",
    title: "Master Data",
    icon: <Data set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "wedding",
        title: "Data Wedding Organizer",
        navLink: "/admin/wedding-organizer",
      },
      {
        id: "pengantin",
        title: "Data Pengantin",
        navLink: "/admin/pengantin",
      },
      {
        id: "customer",
        title: "Data Customer",
        navLink: "/admin/customer",
      },
      {
        id: "produk",
        title: "Data Produk Ucapan Digital",
        navLink: "/admin/produk-ucapan-digital",
      },
      {
        id: "pesanan",
        title: "Data Pesanan",
        navLink: "/admin/pesanan",
      },
    ],
  },

  /**
   * Data Produk WO
   * 1. CRUD User Group / Kategori Komisi
   * 2. CRUD Kelola Produk Ucapan Digital WO
   * 3. CRUD Generate link order / Afiliasi Ucapan Digtal WO
   */
  {
    id: "produk-wo",
    title: "Data Produk WO",
    icon: <ShoppingBag set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "group-user",
        title: "Kategori Komisi",
        navLink: "/admin/group-user",
      },
      {
        id: "produk-ucapan-user",
        title: "Produk Ucapan WO",
        navLink: "/admin/produk-ucapan-user",
      },
      {
        id: "afiliasi-ucapan",
        title: "Link Afiliasi",
        navLink: "/admin/afiliasi-ucapan",
      },
    ],
  },

  /**
   * Menu Komisi WO
   * 1. Saldo Komisi Semua WO
   * 2. Riwayat Komisi Admin/Aplicator
   * 3. Riwayat Komisi WO
   * 4. Pencairan Komisi
   * 5. Riwayat Pencarian Komisi WO
   */
  {
    id: "komisi-wo",
    title: "Komisi WO",
    icon: <Moneys set="curved" className="remix-icon" size={18} />,
    children: [
      {
        id: "saldo-komisi-wo",
        title: "Saldo Komisi Semua WO",
        navLink: "/admin/saldo-komisi-wo",
      },
      {
        id: "riwayat-komisi-admin",
        title: " Riwayat Komisi Admin",
        navLink: "/admin/riwayat-komisi-admin",
      },
      {
        id: "riwayat-komisi-wo",
        title: "Riwayat Komisi WO",
        navLink: "/admin/riwayat-komisi-wo",
      },
      {
        id: "pencairan-komisi",
        title: "Pencairan Komisi WO",
        navLink: "/admin/pencairan-komisi",
      },
      {
        id: "riwayat-pencairan-komisi-wo",
        title: "Riwayat Pencairan WO",
        navLink: "/admin/riwayat-pencairan-komisi-wo",
      },
    ],
  },

  /**
   * Artikel/Blog
   * 1. Kelola Kategori Artikel
   * 2. Tambah, Update, dan Hapus Artikel
   * 3. Cari dan Filter Artikel
   */
  {
    id: "artikel-blog",
    title: "Artikel/Blog",
    icon: <Notepad2 set="curved" className="remix-icon" size={18} />,
    navLink: "/admin/artikel",
  },

  /**
   * Menu Kupon
   * 1.
   */
  {
    id: "kupon",
    title: "Kupon",
    icon: <PercentageSquare set="curved" className="remix-icon" size={18} />,
    navLink: "/admin/kupon",
  },

  /**
   * Pengaturan Website
   * 1. Kontak Admin
   * 2. Sosial Media Dealer
   * 3. FAQ/Pertanyaan Umum
   * 4. Syarat dan Ketentuan
   * 5. Kebijakan Privasi
   * 6. Pembayaran Payment Gateway
   */
  {
    id: "pengaturan-website",
    title: "Pengaturan Website",
    icon: <DocumentCode set="curved" className="remix-icon" size={18} />,
    navLink: "/admin/pengaturan-website",
  },
];

export default adminNav;
