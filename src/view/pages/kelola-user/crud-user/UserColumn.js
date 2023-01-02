import { Space, Popover, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { Edit, Trash, Eye, Danger } from "iconsax-react";

const { confirm } = Modal;
const showModal = (id, name, deleteUser) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${name}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deleteUser(id)

      if (success?.data?.success) {
        message.success('Berhasil menghapus user')
      }
      else {
        message.error('Gagal menghapus user')
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

  {
    title: 'Aksi',
    key: 'action',
    render: payload => (
      <Space size="large" className="icons-container" >

        {payload.permission.includes("/admin/crud-user/detail/:userid") ? (
          <Popover content={"Detail"}>
            <Link to={{
              pathname: `crud-user/detail/${payload.id}`,
              state: {
                permission: 'Detail',
                data: 'User',
                id: payload.id,
                access_menu_id: payload.access_menu_id
              },
            }} >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/crud-user/edit/:userid") ? (
          <Popover content={"Edit"}>
            <Link to={{
              pathname: `crud-user/edit/${payload.id}`,
              state: {
                permission: 'Edit',
                data: 'User',
                id: payload.id
              },
            }}>
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete pengguna") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.deleteUser)} />
          </Popover>
        ) : undefined}


      </Space>
    ),
  },
];

export default columns