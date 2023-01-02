import { Space, Popover, Modal, message } from "antd";
import { Danger, Edit, Trash } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal;
const showModal = (id, name, deleteRole) => {

  confirm({
    title: `Apa anda yakin ingin menghapus ${name}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deleteRole(id)

      if (success?.data?.success) {
        message.success('Berhasil menghapus role')
      }
      else {
        message.error('Gagal menghapus role')
      }
    },
  })
}

const columns = [
  // Kolom nama
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
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
    key: 'aksi',
    render: payload => (
      <Space size='large' className="icons-container">
        {payload.permission.includes("/admin/atur-role/detail/:userid") ? (
          <Popover content={"Edit"}>
            <Link to={{
              pathname: `atur-role/edit/${payload.id}`,
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

        {payload.permission.includes("delete role") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.deleteRole)} />
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns