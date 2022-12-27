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
    title: "Category",
    dataIndex: "article_category",
    key: "article_category",
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (data) => (data === 1 ? "Aktif" : "Non-aktif"),
  },

  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (data) => (
      <img
        src={data}
        alt="thumbnail"
        style={{ width: 100, height: 100, objectFit: "contain" }}
      />
    ),
  },

  {
    title: "Action",
    key: "action",
    width: 200,
    fixed: "right",
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes("/admin/artikel/detail/:id") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/admin/artikel/detail/${payload.id}`,
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/artikel/edit/:id") ? (
          <Popover content={"Edit"}>
            <Link
              to={{
                pathname: `/admin/artikel/edit/${payload.id}`,
              }}
            >
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete artikel") ? (
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
