import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

// TODO: Actions on Saldo (Entah cairin atau apa)

const { confirm } = Modal
const showModal = (id, name, wo, deletePesanan) => {
  confirm({
    title: `Apa anda yakin ingin menghapus request pencairan ${name} dari WO ${wo}?`,
    icon: <Danger color="red" />,
    okText: 'Yakin',
    cancelText: 'Batal',
    okType: 'primary',
    async onOk() {
      const success = await deletePesanan(id)
      if (success) {
        message.success("Berhasil menghapus request")
      }
      else {
        message.error("Gagal menghapus request")
      }
    },
  })
}

const columns = [
  {
    title: 'WO',
    dataIndex: 'wo',
    key: 'wo',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.wo.length - b.wo.length,
  },

  {
    title: 'Request Date',
    dataIndex: 'request_date',
    key: 'request_date',
    render: (date) => <a>{new Date(date).toDateString('en-GB')}</a>,
    sorter: (a, b) => new Date(a.request_date) - new Date(b.request_date),
  },

  {
    title: 'Request Nominal',
    dataIndex: 'request_nominal',
    key: 'request_nominal',
  },

  // Kolom aksi
  {
    title: 'Action',
    key: 'action',
    render: (payload) => (
      <Space size="large" className="icons-container" >

        {payload.permission.includes("/admin/pencairan-komisi/detail/:userid") ? (
          <Popover content={"Detail"}>
            <Link to={{
              pathname: `pencairan-komisi/detail/${payload.id}`,
              state: {
                permission: 'Detail',
                data: 'Pesanan',
                id: payload.id
              },
            }} >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("/admin/pencairan-komisi/edit/:userid") ? (
          <Popover content={"Transfer"}>
            <Link to={{
              pathname: `pencairan-komisi/edit/${payload.id}`,
              state: {
                permission: 'Edit',
                data: 'Pesanan',
                id: payload.id
              },
            }}>
              <Edit size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete pencairan komisi") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.wo, payload.deletePesanan)} />
          </Popover>
        ) : undefined}

      </Space>
    ),
  },
];

export default columns