import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal;
const showModal = (id, groom, bride, deleteBride) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${groom} ${bride}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deleteBride(id)
      if (success) {
        message.success("Berhasil menghapus pengantin")
      }
      else {
        message.error("Gagal menghapus pengantin")
      }
    },
  })
}

const columns = [
  {
    title: 'Pengantin Pria',
    dataIndex: 'groom',
    key: 'groom',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.groom.length - b.groom.length,
  },
  {
    title: 'Pengantin Wanita',
    dataIndex: 'bride',
    key: 'bride',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.bride.length - b.bride.length,
  },

  {
    title: 'No Telp',
    dataIndex: 'phone',
    key: 'phone',
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
    render: payload => (
      <Space size="large" className="icons-container" >

        {payload.permission.includes("/admin/pengantin/detail/:userid") ? (
          <Popover content={"Detail"}>
            <Link to={{
              pathname: `pengantin/detail/${payload.id}`,
              state: {
                permission: 'Detail',
                data: 'Pengantin',
                id: payload.id
              },
            }} >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/pengantin/edit/:userid") ? (
          <Popover content={"Edit"}>
            <Link to={{
              pathname: `pengantin/edit/${payload.id}`,
              state: {
                permission: 'Edit',
                data: 'Pengantin',
                id: payload.id
              },
            }}>
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete pengantin") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.groom, payload.bride, payload.deleteBride)} />
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns