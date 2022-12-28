import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const { confirm } = Modal;
const showModal = (id, name, deleteCustomer) => {
  confirm({
    title: `Apa anda yakin ingin menghapus ${name}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deleteCustomer(id)
      if (success) {
        message.success("Berhasil menghapus customer")
      }
      else {
        message.error("Gagal menghapus customer")
      }
    },
  })
}

const columns = [
  {
    title: 'Name',
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
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },

  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },


  // Kolom aksi
  {
    title: 'Action',
    key: 'action',
    width: "25%",
    render: payload => (
      <Space size="large" className="icons-container" >
        {payload.permission.includes("/admin/customer/detail/:userid") ? (
          <Popover content={"Detail"}>
            <Link to={{
              pathname: `customer/detail/${payload.id}`,
              state: {
                permission: 'Detail',
                data: 'Customer',
                id: payload.id
              },
            }} >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/customer/edit/:userid") ? (
          <Popover content={"Edit"}>
            <Link to={{
              pathname: `customer/edit/${payload.id}`,
              state: {
                permission: 'Edit',
                data: 'Customer',
                id: payload.id
              },
            }}>
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete pelanggan") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.deleteCustomer)} />
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns