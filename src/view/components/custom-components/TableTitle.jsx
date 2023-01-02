import React from "react";

const TableTitle = ({ customTitle }) => {
  const url = window.location.href;
  const splitUrl = url.split("/");

  const splitTitle = splitUrl[splitUrl.length - 1].split("-");
  const title = splitTitle.map((titles) => {
    return titles.charAt(0).toUpperCase() + titles.slice(1);
  });

  return (
    <p style={{ marginBottom: "30px", fontSize: "1.2em", fontWeight: "500" }}>
      Data {customTitle ? customTitle : title.join(" ")}
    </p>
  );
};

export default TableTitle;
