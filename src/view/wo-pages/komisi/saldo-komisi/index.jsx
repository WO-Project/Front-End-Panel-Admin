import moment from "moment";
import {
  Table,
  Row,
  Col,
  Card,
  Button,
  Statistic,
  DatePicker,
  Space,
  Typography,
  Popover,
} from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Eye } from "iconsax-react";

import TableDisplay from "../../../components/custom-components/TableDisplay";
import TableCard from "../../../components/custom-components/TableCard";
import Column from "./SaldoKomisiColumn";

import { getWeddingOrganizers } from "../../../../api/wedding-organizer/getWeddingOrganizers";
import { getOneWeddingOrganizer } from "../../../../api/wedding-organizer/getOneWeddingOrganizer";
import { usePermissionContext } from "../../../../context/PermissionContext";

export default function () {
  const woId = localStorage.getItem("id");
  const { permission } = usePermissionContext();

  const {
    data: dataWO,
    loading: loadingWO,
    error: errorWO,
  } = getOneWeddingOrganizer(woId);

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <a>{new Date(date).toLocaleString("en-GB")}</a>,
    },

    {
      title: "Nominal",
      dataIndex: "nominal",
      key: "nominal",
    },

    {
      title: "Detail",
      key: "action",
      render: (payload) => (
        <Space size="large" className="icons-container">
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/admin/riwayat-komisi-wo/detail/${payload.id}`,
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
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row align="stretch">
        <Col span={5}>
          <Card
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <Statistic title="Saldo Anda" value={112893} prefix="Rp." />
              <Button
                style={{
                  marginTop: 16,
                }}
                type="primary"
                danger
              >
                Tarik Saldo
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={19}>
          <Card>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              Riwayat Pencairan
            </Typography>
            <Table
              size="small"
              columns={columns}
              dataSource={[
                {
                  name: "tes",
                  date: "22",
                  nominal: 2,
                },
                {
                  name: "tes",
                  date: "22",
                  nominal: 2,
                },
                {
                  name: "tes",
                  date: "22",
                  nominal: 2,
                },
              ]}
              scroll={{ x: 400, y: 100 }}
              className="master-table"
              pagination={{
                size: "small",
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Card>
          <Typography
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Riwayat Komisi
          </Typography>
          <Table
            size="small"
            columns={columns}
            dataSource={[
              {
                name: "tes",
                date: "22",
                nominal: 2,
              },
              {
                name: "tes",
                date: "22",
                nominal: 2,
              },
              {
                name: "tes",
                date: "22",
                nominal: 2,
              },
            ]}
            scroll={{ x: 400, y: 100 }}
            className="master-table"
            pagination={{
              size: "small",
            }}
          />
        </Card>
      </Row>

      {/* <Bar /> */}
    </>
  );
}
