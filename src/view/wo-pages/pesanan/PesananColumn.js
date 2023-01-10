import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal;
const showModal = (id, name, wo, deletePesanan) => {
  confirm({
    title: `Apa anda yakin ingin menghapus riwayat pesanan ${name} dari WO ${wo}?`,
    icon: <Danger color="red" />,
    okText: "Yakin",
    cancelText: "Batal",
    okType: "primary",
    async onOk() {
      const success = await deletePesanan(id);
      if (success) {
        message.success("Berhasil menghapus produk");
      } else {
        message.error("Gagal menghapus produk");
      }
    },
  });
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "WO",
    dataIndex: "wo",
    key: "wo",
  },

  // Kolom aksi
  {
    title: "Action",
    key: "action",
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes("/wo/pesanan/detail/:id") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `pesanan/detail/${payload.id}`,
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

        {/* <Popover content={"Edit"}>
          <Link to={{
            pathname: `pesanan/edit/${payload.id}`,
            state: {
              permission: 'Edit',
              data: 'Pesanan',
              id: payload.id
            },
          }}>
            <Edit size={20} />
          </Link>
        </Popover> */}

        {payload.permission.includes("delete pesanan wo") ? (
          <Popover content={"Delete"}>
            <Trash
              color="red"
              size={20}
              className="trash"
              onClick={() =>
                showModal(
                  payload.id,
                  payload.name,
                  payload.wo,
                  payload.deletePesanan
                )
              }
            />
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns;
