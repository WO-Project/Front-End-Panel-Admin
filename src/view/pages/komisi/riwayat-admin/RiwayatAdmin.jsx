import moment from "moment";
import {
  Row,
  Col,
  Space,
  Popover,
  Modal,
  DatePicker,
  message,
  Button,
  Table,
} from "antd";
import { Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import TableDisplay from "../../../components/custom-components/TableDisplay";
import TableCard from "../../../components/custom-components/TableCard";

import { getAdminCommissions } from "../../../../api/komisi/getAdminCommissions";
import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { usePermissionContext } from "../../../../context/PermissionContext";

const MasterDisplay = () => {
  let { data, deletePesanan } = getAdminCommissions();

  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();
  const [currentData, setCurrentData] = useState();

  const searchInput = useRef(null);
  const pdfComponent = useRef();

  const filterData = (currentData) => {
    setCurrentData(currentData);
  };

  const handlePrintToPDF = useReactToPrint({
    content: () => pdfComponent.current,
  });
  const { permission } = usePermissionContext();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <DatePicker.RangePicker
          style={{ marginBottom: 8, display: "block" }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e ? [e] : [])}
          onPressEnter={() => {
            confirm();
            setSearchText(selectedKeys[0]), setSearchedColumn(dataIndex);
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={""}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ? moment(record[dataIndex]).isBetween(value[0], value[1], "day", "[]")
        : "",

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) => moment(text).format("DD/MM/YYYY"),
  });

  const mapDataToCsv = (data) => {
    const csvData = data.map((d) => {
      return {
        id: d.id,
        date: d.date,
        type: d.type == 1 ? "Percent" : "Nominal",
        name: d.name,
        nominal: d.nominal,
        wo: d.wo,
      };
    });
    return csvData;
  };

  data = data.map((d) => {
    return {
      id: d.id,
      date: d.created_at,
      name: d.name,
      type: d.type,
      nominal: d.nominal_get,
      wo: d.commission ? d.commission.wedding_organizer.name : "",
      deletePesanan: deletePesanan,
      permission,
    };
  });

  const { confirm } = Modal;
  const showModal = (id, name, wo, deletePesanan) => {
    confirm({
      title: `Apa anda yakin ingin menghapus riwayat komisi ${name} dari WO ${wo}?`,
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <a>{new Date(date).toLocaleString("en-GB")}</a>,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ...getColumnSearchProps("date"),
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <a>{type == 1 ? "Percent" : "Direct"}</a>,
    },

    {
      title: "Nominal",
      dataIndex: "nominal",
      key: "nominal",
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
          {payload.permission.includes(
            "/admin/riwayat-komisi-admin/detail/:userid"
          ) ? (
            <Popover content={"Detail"}>
              <Link
                to={{
                  pathname: `/admin/riwayat-komisi-admin/detail/${payload.id}`,
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

          {payload.permission.includes("delete riwayat komisi admin") ? (
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

  return (
    <>
      <TableCard customTitle={"Riwayat Komisi Admin"}>
        <Row>
          <Col span={24}>
            <div>
              <TableDisplay
                data={data}
                column={columns}
                tableProps={{ ref: pdfComponent }}
                filteredState={filterData}
                otherButton={[
                  {
                    name: (
                      <CSVLink
                        style={{ width: 200 }}
                        filename={"AdminHistory.csv"}
                        data={
                          currentData != null
                            ? mapDataToCsv(currentData)
                            : mapDataToCsv(data)
                        }
                      >
                        <p>Download CSV</p>
                      </CSVLink>
                    ),
                  },
                  {
                    name: "Print PDF",
                    click: handlePrintToPDF,
                  },
                ]}
              />
            </div>
          </Col>
        </Row>
      </TableCard>
    </>
  );
};

export default MasterDisplay;
