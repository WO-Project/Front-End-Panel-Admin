import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal
const showModal = (id, name, deleteProduct) => {
  confirm({
    title: `Apa anda yakin ingin menghapus produk ${name}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deleteProduct(id)
      if (success) {
        message.success("Berhasil menghapus produk")
      }
      else {
        message.error("Gagal menghapus produk")
      }
    },
  })
}

const columns = [
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: 'Harga',
    dataIndex: 'price',
    key: 'price',
    render: price => <p>{parseInt(price).toLocaleString("en-US")}</p>
  },

  {
    title: 'Kategori Produk',
    dataIndex: 'product_category',
    key: 'product_category',
    render: product => <p>{product?.name}</p>
  },

  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      switch (status) {
        case 1:
          return <p>Aktif</p>
        case 2:
          return <p>Non Aktif</p>
        default:
          return <p>{status}</p>
      }
    }
  },


  // Kolom aksi
  {
    title: 'Aksi',
    key: 'action',
    width: "25%",
    render: payload => {

      return (
        <Space size="large" className="icons-container" >

          {payload.permission.includes("/admin/produk-ucapan-digital/detail/:userid") ? (
            <Popover content={"Detail"}>
              <Link to={{
                pathname: `produk-ucapan-digital/detail/${payload.id}`,
                state: {
                  permission: 'Detail',
                  data: 'Produk Ucapan Digital',
                  id: payload.id
                },
              }} >
                <Eye size={20} />
              </Link>
            </Popover>
          ) : undefined}

          {payload.permission.includes("/admin/produk-ucapan-digital/detail/:userid") ? (
            <Popover content={"Edit"}>
              <Link to={{
                pathname: `produk-ucapan-digital/edit/${payload.id}`,
                state: {
                  permission: 'Edit',
                  data: 'Produk Ucapan Digital',
                  id: payload.id
                },
              }}>
                <Edit size={20} />
              </Link>
            </Popover>
          ) : undefined}

          {payload.permission.includes("delete produk ucapan") ? (
            <Popover content={"Delete"}>
              <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.deleteProduct)} />
            </Popover>
          ) : undefined}

        </Space>
      )
    },
  },
];

export default columns