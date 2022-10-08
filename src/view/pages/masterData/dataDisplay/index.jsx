import { Input, Row, Col, Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'

import Column from './dummyColumn'
import Data from './dummyData'

const DataPengguna = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(Data)
  }, [])

  const userSearch = (input) => {
    if (input == '') return setData(Data)

    const filteredData = Data.filter((person) => {
      return person.name.toLowerCase().includes(input.toLowerCase())
    })

    setData(filteredData)
  }

  const url = window.location.href
  const splitUrl = url.split('/')

  const splitTitle = splitUrl[splitUrl.length - 1].split('-')
  const title = splitTitle.map((titles) => {
    return titles.charAt(0).toUpperCase() + titles.slice(1)
  })

  return (
    <Card bodyStyle={{ padding: "15px 20px" }} xs={{ padding: '100px' }} style={{ borderRadius: '10px' }} className="wedding-organizer">

      <Row>
        <Col>
          <p style={{ marginBottom: '30px', fontSize: '1.2em', fontWeight: '500' }}>Data {title.join(' ')}</p>
        </Col>
      </Row>

      <Row align='middle' style={{ marginBottom: '30px' }} justify='space-between'>
        <Col lg={6} span={12}>
          <Input placeholder="Search..." style={{ height: '35px' }} onChange={(value) => userSearch(value.target.value)} />
        </Col>
        <Col lg={5} span={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" style={{ height: '35px', width: '100%', maxWidth: '150px' }}>Tambah Data</Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table size='small' columns={Column} dataSource={data} scroll={{ x: 400 }} expandable={{
            expandedRowRender: (record) => (
              <div className='expanded-row'>
                <p >Judul expanded row : </p>
                <ol>
                  <li>list 1</li>
                  <li>list 2</li>
                </ol>
              </div>
            )
          }} className="master-table" />;
        </Col>
      </Row>

    </Card>
  )
}

export default DataPengguna