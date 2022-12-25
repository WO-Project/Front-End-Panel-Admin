import { Link } from "react-router-dom";

import { Space, Popover, Modal } from "antd";
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
    title: "Tipe",
    dataIndex: "type",
    key: "type",
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
  },

  {
    title: "Action",
    key: "action",
    width: 200,
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes("/admin/kupon/detail/:id") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/admin/kupon/detail/${payload.id}`,
                id: payload.id,
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/kupon/edit/:id") ? (
          <Popover content={"Edit"}>
            <Link
              to={{
                pathname: `/admin/kupon/edit/${payload.id}`,
              }}
            >
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete kupon") ? (
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
