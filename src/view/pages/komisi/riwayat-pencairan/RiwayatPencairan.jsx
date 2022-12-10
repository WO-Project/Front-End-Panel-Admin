import moment from 'moment';
import { Row, Col, Space, Popover, Modal, DatePicker, message, Button } from 'antd'
import { Trash, Eye, Danger } from "iconsax-react";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

import TableDisplay from '../../../components/custom-components/TableDisplay'
import TableCard from '../../../components/custom-components/TableCard'

import { getDisbursed } from "../../../../api/disbursement/getDisbursed"
import { useRef, useState } from 'react'
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';

const MasterDisplay = () => {
  let { data, deletePesanan } = getDisbursed()
  
  const [searchText, setSearchText] = useState()
  const [searchedColumn, setSearchedColumn] = useState()
  const [currentData, setCurrentData] = useState()

  const searchInput = useRef(null);
  const pdfComponent = useRef()

  const filterData = (currentData) => {
    setCurrentData(currentData)
  }

  const handlePrintToPDF = useReactToPrint({
    content: () => pdfComponent.current
  })

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <DatePicker.RangePicker 
          style={{ marginBottom: 8, display: 'block' }} 
          value={selectedKeys[0]} 
          onChange={e => setSelectedKeys(e ? [e] : [])} 
          onPressEnter={() => { confirm(); setSearchText(selectedKeys[0]), setSearchedColumn(dataIndex); }} 
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
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),

    onFilter: (value, record) => 
      record[dataIndex] ? moment(record[dataIndex]).isBetween(value[0], value[1], 'day', '[]') : "",

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: text => moment(text).format("DD/MM/YYYY")
  });

  const mapDataToCsv = (data) => {
    const csvData = data.map((d) => {
      return {
        id: d.id,
        request_date: d.request_date,
        disbursement_date: d.disbursement_date,
        name: d.name,
        wo: d.wo,
      }
    })
    return csvData
  }

  data = data.map((d) => {
    return {
      id: d.id,
      request_date: d.request_date,
      disbursement_date: d.disbursement_date,
      name: d.disbursement_name,
      wo: d.commission ? d.commission.wedding_organizer.name : "",
      deletePesanan: deletePesanan
    }
  })

  const { confirm } = Modal
  const showModal = (id, name, wo, deletePesanan) => {
    confirm({
      title: `Apa anda yakin ingin menghapus riwayat pencairan ${name} dari WO ${wo}?`,
      icon: <Danger color="red" />,
      okText: 'Yakin',
      cancelText: 'Batal',
      okType: 'primary',
      async onOk() {
        const success = await deletePesanan(id)
        if (success) {
          message.success("Berhasil menghapus riwayat pencairan")
        }
        else {
          message.error("Gagal menghapus riwayat pencairan")
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
      title: 'Request Date',
      dataIndex: 'request_date',
      key: 'request_date',
      render: (date) => <a>{new Date(date).toDateString('en-GB')}</a>,
      sorter: (a, b) => new Date(a.request_date) - new Date(b.request_date),
      ...getColumnSearchProps('request_date'),
    },

    {
      title: 'Disbursement Date',
      dataIndex: 'disbursement_date',
      key: 'disbursement_date',
      render: (date) => <a>{new Date(date).toDateString('en-GB')}</a>,
      sorter: (a, b) => new Date(a.disbursement_date) - new Date(b.disbursement_date),
      ...getColumnSearchProps('disbursement_date'),
    },

    {
      title: 'WO',
      dataIndex: 'wo',
      key: 'wo',
    },

    // Kolom aksi
    {
      title: 'Action',
      key: 'action',
      render: (payload) => (
        <Space size="large" className="icons-container" >
          <Popover content={"Detail"}>
            <Link to={{
              pathname: `riwayat-pencairan-komisi-wo/detail/${payload.id}`,
              state: {
                permission: 'Detail',
                data: 'Pesanan',
                id: payload.id
              },
            }} >
              <Eye size={20} />
            </Link>
          </Popover>

          <Popover content={"Delete"}>
            <Trash color="red" size={20} className='trash' onClick={() => showModal(payload.id, payload.disbursement_name, payload.wo, payload.deletePesanan)} />
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <>
      <TableCard>

        <Row>
          <Col span={24}>
            <div ref={pdfComponent}>
              <TableDisplay data={data} column={columns} filteredState={filterData} />
            </div>
          </Col>
        </Row>

      </TableCard>

      <Button
        onClick={console.log(currentData)}
        size="medium"
        style={{
          width: 180,
        }}
      >
        <CSVLink filename={"DisbursementHistory.csv"}
        data={currentData != null ? mapDataToCsv(currentData) : mapDataToCsv(data)}
        >
          Download CSV
        </CSVLink>
      </Button>

      <Button
        onClick={handlePrintToPDF}
        size="medium"
        style={{
          width: 180,
        }}
      >
        Download PDF
      </Button>
    </>
  )
}

export default MasterDisplay