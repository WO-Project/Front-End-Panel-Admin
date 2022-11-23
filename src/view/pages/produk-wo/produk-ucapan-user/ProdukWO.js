import { Space, Popover, Modal } from "antd";
import { Link } from "react-router-dom";
import { Edit, Trash, Eye, Danger } from "iconsax-react";

const { confirm } = Modal;
const showModal = (id, destroy) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${id}?`,
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
    title: "Pengantin Pria",
    dataIndex: "groom",
    key: "groom",
  },

  {
    title: "Pengantin Perempuan",
    dataIndex: "bride",
    key: "bride",
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
        <Popover content={"Detail"}>
          <Link
            to={{
              pathname: `/admin/produk-ucapan-user/detail/${payload.id}`,
            }}
          >
            <Eye size={20} />
          </Link>
        </Popover>

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

        <Popover content={"Delete"}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              showModal(payload.id, payload.destroy);
            }}
          >
            <Trash color="red" size={20} />
          </Link>
        </Popover>
      </Space>
    ),
  },
];

export default columns;
