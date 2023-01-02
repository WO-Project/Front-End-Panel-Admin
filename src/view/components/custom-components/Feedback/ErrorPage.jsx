import { Result, Button } from "antd";

export default function ErrorPage({ message }) {
  return (
    <Result
      status="500"
      title="Error"
      subTitle={message}
      extra={
        <Button
          type="primary"
          key="back-to-home"
          onClick={() => history.back()}
        >
          Kembali
        </Button>
      }
    />
  );
}
