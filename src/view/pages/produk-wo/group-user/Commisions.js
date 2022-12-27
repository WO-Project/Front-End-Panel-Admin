import { Space, Popover, Modal } from "antd";
import { Link } from "react-router-dom";
import { Edit, Trash, Eye, Danger } from "iconsax-react";

const { confirm } = Modal;
const showModal = (id, name, destroy) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${name}?`,
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
    title: "Nama",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "WO",
    dataIndex: "wo",
    key: "wo",
  },

  {
    title: "Tipe",
    dataIndex: "type",
    key: "type",
    render: (data) => (data === 1 ? "Persentase" : "nominal"),
  },

  {
    title: "Nominal",
    dataIndex: "nominal",
    key: "nominal",
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
        {payload.permission.includes("/admin/group-user/detail/:id") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/admin/group-user/detail/${payload.id}`,
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/group-user/edit/:id") ? (
          <Popover content={"Edit"}>
            <Link
              to={{
                pathname: `/admin/group-user/edit/${payload.id}`,
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

        {payload.permission.includes("delete kategori komisi") ? (
          <Popover content={"Delete"}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                showModal(payload.id, payload.name, payload.destroy);
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
