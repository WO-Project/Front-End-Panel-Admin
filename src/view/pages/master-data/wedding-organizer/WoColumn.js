import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal;
const showModal = (id, name, deleteWo) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${name}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',

    async onOk() {
      const success = await deleteWo(id)
      if (success) {
        message.success("Berhasil menghapus WO")
      }
      else {
        message.error("Gagal menghapus WO")
      }
    },
  })
}

const columns = [
  // Kolom nama
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: 'No Telp',
    dataIndex: 'phone',
    key: 'phone',
  },

  // {
  //   title: 'Website',
  //   dataIndex: 'website',
  //   key: 'website',
  // },

  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
    render: payload => (
      <Space size="large" className="icons-container" >

        {payload.permission.includes("/admin/wedding-organizer/detail/:userid") ? (
          <Popover content={"Detail"}>
            <Link to={{
              pathname: `wedding-organizer/detail/${payload.id}`,
              state: {
                permission: 'Detail',
                data: 'Wedding Organizer',
                id: payload.id
              },
            }} >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/wedding-organizer/detail/:userid") ? (
          <Popover content={"Edit"}>
            <Link to={{
              pathname: `wedding-organizer/edit/${payload.id}`,
              state: {
                permission: 'Edit',
                data: 'Wedding Organizer',
                id: payload.id
              },
            }}>
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete wo") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.deleteWo)} />
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns