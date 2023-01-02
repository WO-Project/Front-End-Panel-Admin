import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal
const showModal = (id, name, deleteProductCategory) => {
  confirm({
    title: `Apa anda yakin ingin menghapus kategori produk ${name}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deleteProductCategory(id)
      if (success) {
        message.success("Berhasil menghapus kategori produk")
      }
      else {
        message.error("Gagal menghapus kategori produk")
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
    title: 'Deskripsi',
    dataIndex: 'description',
    key: 'description',
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
    render: payload => {

      return (
        <Space size="large" className="icons-container" >

          {payload.permission.includes("/admin/kategori-produk-ucapan-digital/detail/:userid") ? (
            <Popover content={"Detail"}>
              <Link to={{
                pathname: `kategori-produk-ucapan-digital/detail/${payload.id}`,
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

          {payload.permission.includes("/admin/kategori-produk-ucapan-digital/detail/:userid") ? (
            <Popover content={"Edit"}>
              <Link to={{
                pathname: `kategori-produk-ucapan-digital/edit/${payload.id}`,
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

          {payload.permission.includes("delete kategori produk") ? (
            <Popover content={"Delete"}>
              <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.deleteProductCategory)} />
            </Popover>
          ) : undefined}

        </Space>
      )
    },
  },
];

export default columns