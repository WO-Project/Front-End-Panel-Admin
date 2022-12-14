import { Space, Popover, Modal } from "antd";
import { Link } from "react-router-dom";
import { Edit, Trash, Eye, Danger } from "iconsax-react";

const { confirm } = Modal;
const showModal = (id, product, destroy) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${product}?`,
    icon: <Danger color="red" />,
    okText: "Yakin",
    cancelText: "Batal",
    okType: "primary",
    onOk() {
      destroy(id);
    },
  });
};

const columns = [
  {
    title: "Nama Produk",
    dataIndex: "product",
    key: "product",
  },

  {
    title: "Wedding Organizer",
    dataIndex: "wo",
    key: "wo",
  },

  {
    title: "Pengantin",
    key: "groom",
    render: (payload) => `${payload.groom} & ${payload.bride}`,
  },

  {
    title: "Harga",
    key: "price",
    render: (payload) =>
      "Rp." + `${payload.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (data) => (data === 1 ? "Aktif" : "Non-aktif"),
  },

  {
    title: "Action",
    key: "action",
    width: 200,
    fixed: "right",
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes("/admin/produk-ucapan-user/detail/:id") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/admin/produk-ucapan-user/detail/${payload.id}`,
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/produk-ucapan-user/edit/:id") ? (
          <Popover content={"Edit"}>
            <Link
              to={{
                pathname: `/admin/produk-ucapan-user/edit/${payload.id}`,
                state: {
                  permission: "Edit",
                  data: "User",
                  id: payload.id,
                },
              }}
            >
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete produk wo") ? (
          <Popover content={"Delete"}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                showModal(payload.id, payload.product, payload.destroy);
              }}
            >
              <Trash color="red" size={20} />
            </Link>
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns;
