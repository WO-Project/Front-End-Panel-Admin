import React from "react";
import { useHistory } from "react-router-dom";

import { Card } from "antd";
import { Back } from "iconsax-react";

const CardForm = ({ children, title, back }) => {
  const history = useHistory();
  return (
    <Card
      className="form-crud"
      title={
        back ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Back
              size="25"
              color="#000000"
              onClick={history.goBack}
              className="custom-component-back-button"
            />
            <h1>{title}</h1>
          </div>
        ) : (
          title
        )
      }
    >
      {children}
    </Card>
  );
};

export default CardForm;
