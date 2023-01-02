import { Table, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import TableSearch from "./TableSearch";

const TableDisplay = ({
  data,
  column,
  addButton,

  /**
   * Array of Button
   * ex: [
   *    {
   *      name: "button name",
   *      link: "button link",
   *      click: "click event listener"
   *    },
   * ]
   */
  otherButton,

  loading,
  expandable,
  createLink = `${window.location.pathname}/create`,
  colomWidth = 400,
  filteredState,
  filteredColumn,
  tableProps,
}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        className="table-tools-container"
      >
        <Col lg={6} md={8} sm={10} span={12}>
          <TableSearch
            data={data}
            setTableData={setTableData}
            filteredColumn={filteredColumn}
          />
        </Col>

        <Col className="button-right">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            {otherButton
              ? otherButton.map((btn) => {
                  if (!btn?.name) {
                    return btn.component;
                  }
                  return btn.link ? (
                    <Link to={btn.link}>
                      <Button
                        type="primary"
                        danger
                        size="small"
                        style={
                          btn.name.length <= 15 ? { fontSize: "12px" } : {}
                        }
                        onClick={btn.click ? btn.click : () => {}}
                      >
                        {btn.name}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      type="primary"
                      danger
                      size="small"
                      style={{ width: "100%" }}
                      onClick={
                        btn.click ? btn.click : (e) => e.stopPropagation()
                      }
                    >
                      {btn.name}
                    </Button>
                  );
                })
              : undefined}
            {addButton ? (
              <Link to={{ pathname: createLink, method: addButton }}>
                <Button type="primary" danger size="small">
                  Tambah Data
                </Button>
              </Link>
            ) : undefined}
          </div>
        </Col>
      </Row>

      <Table
        loading={loading}
        size="small"
        columns={column}
        dataSource={tableData}
        scroll={{ x: colomWidth, y: 300 }}
        className="master-table"
        expandable={
          expandable && {
            expandedRowRender: () => (
              <div className="expanded-row">
                <p>Judul expanded row : </p>
                <ol>
                  <li>list 1</li>
                  <li>list 2</li>
                </ol>
              </div>
            ),
          }
        }
        pagination={{
          size: "small",
        }}
        onChange={(pagination, filters, sorter, extra) => {
          filteredState ? filteredState(extra.currentDataSource) : undefined;
        }}
        {...tableProps}
      />
    </>
  );
};

export default TableDisplay;
