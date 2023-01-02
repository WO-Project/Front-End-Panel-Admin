import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import TableTitle from "./TableTitle";
import { Back } from "iconsax-react";

const TableCard = ({ back, customTitle, children }) => {
  const history = useHistory();
  return (
    <Card
      bodyStyle={{ padding: "15px 20px" }}
      xs={{ padding: "100px" }}
      className="custom-component-table-card"
    >
      <Row>
        {back == true ? (
          <Col>
            <Back
              size="25"
              color="#000000"
              onClick={history.goBack}
              className="custom-component-back-button"
            />
          </Col>
        ) : typeof back == "string" ? (
          <Col>
            <Back
              size="25"
              color="#000000"
              onClick={() => history.push(back)}
              className="custom-component-back-button"
            />
          </Col>
        ) : (
          ""
        )}

        <Col offset={back ? 1 : 0}>
          <TableTitle customTitle={customTitle} />
        </Col>
      </Row>

      {children}
    </Card>
  );
};

export default TableCard;
