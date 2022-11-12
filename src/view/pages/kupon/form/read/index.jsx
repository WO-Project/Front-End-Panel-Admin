import { useHistory, useParams } from "react-router-dom";

import { Button, Form, Space, Spin } from "antd";

import CardForm from "../../../../components/custom-components/form-crud/CardForm";
import { useKuponDetail } from "../../../../../api/kupon";

const index = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data, err, loading } = useKuponDetail(id);

  if (loading)
    return (
      <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`}>
        <Spin />
      </CardForm>
    );

  if (err)
    retrun(
      <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          autoComplete="off"
          size="small"
        >
          <Form.Item label="ID Artikel" name="id" key="id">
            <p>{err}</p>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 4,
            }}
          >
            <Space size="middle">
              <Button danger htmlType="button" onClick={() => history.goBack()}>
                Kembali
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CardForm>
    );

  return (
    <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        autoComplete="off"
        size="small"
      >
        <Form.Item label="Nama" name="name" key="name">
          <p>{data?.name}</p>
        </Form.Item>
        <Form.Item label="Tipe" name="type" key="type">
          <p>{data?.type}</p>
        </Form.Item>
        <Form.Item label="Nominal" name="nominal" key="nominal">
          <p>{data?.nominal}</p>
        </Form.Item>
        <Form.Item label="Kuota" name="quota" key="quota">
          <p>{data?.quota}</p>
        </Form.Item>
        <Form.Item label="Terpakai" name="used" key="used">
          <p>{data?.used}</p>
        </Form.Item>
        <Form.Item label="Mulai" name="begin_date" key="begin_date">
          <p>{data?.begin_date}</p>
        </Form.Item>
        <Form.Item label="Kadaluwarsa" name="end_date" key="end_date">
          <p>{data?.end_date}</p>
        </Form.Item>
        <Form.Item label="Status" name="status" key="status">
          <p>{data?.status}</p>
        </Form.Item>
        <Form.Item label="Kreator" name="creator" key="creator">
          <p>{data?.creator}</p>
        </Form.Item>
        <Form.Item label="Editor" name="editor" key="editor">
          <p>{data?.editor}</p>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size="middle">
            <Button danger htmlType="button" onClick={() => history.goBack()}>
              Kembali
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
