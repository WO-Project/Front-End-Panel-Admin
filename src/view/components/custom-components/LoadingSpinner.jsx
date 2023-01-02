import { Spin } from "antd";

const LoadingSpinner = ({ fillVertically }) => {
  return (
    <div
      style={{
        width: "100%",
        height: fillVertically ? "100vh" : "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default LoadingSpinner;
