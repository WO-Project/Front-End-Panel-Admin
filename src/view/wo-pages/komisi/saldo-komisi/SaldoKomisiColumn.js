import { Space, Popover, Modal, message } from "antd";
import { Edit, Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

// TODO: Actions on Saldo (Entah cairin atau apa)

const columns = [
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Saldo",
    dataIndex: "saldo",
    key: "saldo",
    render: (saldo) => <a>{saldo}</a>,
    sorter: (a, b) => a.saldo - b.saldo,
  },

  // Kolom aksi
  {
    title: "Action",
    key: "action",
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes(
          "/admin/saldo-komisi-wo/detail/:userid"
        ) ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `wedding-organizer/detail/${payload.id}`,
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

        {payload.permission.includes("delete saldo komisi wo") ? (
          <Popover content={"Delete"}>
            <Trash color="red" size={20} className="trash" />
            {/* <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.name, payload.wo, payload.deletePesanan)} /> */}
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

const DisbursementRequestColumns = [
  {
    title: "Komisi",
    dataIndex: "commission",
    key: "commission",
  },
  {
    title: "Tanggal Pengajuan",
    dataIndex: "request_date",
    key: "request_date",
  },
  {
    title: "Nominal Pengajuan",
    dataIndex: "request_nominal",
    key: "request_nominal",
  },
];

const DisbursementHistoryColumns = [
  {
    title: "Komisi",
    dataIndex: "commission",
    key: "commission",
  },
  {
    title: "Tanggal Pencairan",
    dataIndex: "disbursement_date",
    key: "disbursement_date",
  },
  {
    title: "Nominal Pencairan",
    dataIndex: "disbursement_nominal",
    key: "disbursement_nominal",
  },
  {
    title: "detail",
    key: "action",
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes("/wo/pencairan-komisi/detail/:id") ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/wo/pencairan-komisi/detail/${payload.id}`,
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export { DisbursementRequestColumns, DisbursementHistoryColumns };

export default columns;
