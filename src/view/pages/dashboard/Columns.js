import { Space, Popover } from "antd";
import { Eye } from "iconsax-react";
import { Link } from "react-router-dom";

export const bestSellingColumns = [
  {
    title: "Produk",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Harga",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Terjual",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: "Wedding Organizer",
    dataIndex: "wo_name",
    key: "wo_name",
  },
  {
    title: "Detail",
    key: "action",
    width: 200,
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes(
          "/admin/produk-ucapan-digital/detail/:userid"
        ) ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `admin/produk-ucapan-digital/detail/${payload.product_id}`,
                state: {
                  permission: "Detail",
                  data: "Produk Ucapan Digital",
                  id: payload.product_id,
                },
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export const lastOrderColumns = [
  {
    title: "Nama Produk",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Pengantin",
    dataIndex: "brideGroom",
    key: "brideGroom",
  },
  {
    title: "Wedding Organizer",
    dataIndex: "wo",
    key: "wo",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Detail",
    key: "action",
    width: 200,
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes("/admin/pesanan/detail/:userid") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `admin/pesanan/detail/${payload.id}`,
                state: {
                  permission: "Detail",
                  data: "Pesanan",
                  id: payload.id,
                },
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];
