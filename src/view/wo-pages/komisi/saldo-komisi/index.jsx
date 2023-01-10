import { Link } from "react-router-dom";

import { Table, Row, Col, Card, Button, Statistic, Typography } from "antd";

import { usePermissionContext } from "../../../../context/PermissionContext";
import { getDisburseRequests } from "../../../../api/disbursement/getDisburseRequests";
import { getDisbursed } from "../../../../api/disbursement/getDisbursed";

import {
  DisbursementRequestColumns,
  DisbursementHistoryColumns,
} from "./SaldoKomisiColumn";

export default function () {
  const { permission } = usePermissionContext();
  const {
    data: disburseRequestData,
    error: disburseRequestError,
    loading: disburseRequestLoading,
  } = getDisburseRequests();
  const {
    data: disbursedData,
    error: disbursedError,
    loading: disbursedLoading,
  } = getDisbursed();

  return (
    <>
      <Row>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <Statistic title="Saldo Anda" value={112893} prefix="Rp." />
              <Link to="/wo/saldo-komisi/request">
                <Button
                  style={{
                    marginTop: 16,
                  }}
                  type="primary"
                  danger
                >
                  Tarik Saldo
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              Pencairan
            </Typography>
            <Table
              loading={disburseRequestLoading}
              size="small"
              columns={DisbursementRequestColumns}
              dataSource={
                disburseRequestLoading
                  ? undefined
                  : disburseRequestData.map((d) => ({
                      ...d,
                      commission: d.commission?.name,
                    }))
              }
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
            Riwayat Pencairan
          </Typography>
          <Table
            loading={disbursedLoading}
            size="small"
            columns={DisbursementHistoryColumns}
            dataSource={
              disbursedLoading
                ? undefined
                : disbursedData.map((d) => ({
                    ...d,
                    commission: d.commission.name,
                    permission,
                  }))
            }
            scroll={{ x: 400, y: 100 }}
            className="master-table"
            pagination={{
              size: "small",
            }}
          />
        </Card>
      </Row>
    </>
  );
}
