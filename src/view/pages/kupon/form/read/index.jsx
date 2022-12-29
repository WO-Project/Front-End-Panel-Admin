import { useHistory, useParams } from "react-router-dom";

import { Button, Form, Space, Spin } from "antd";

import CardForm from "../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../components/custom-components/Feedback/ErrorPage";

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

  if (err) return <ErrorPage message={err} />;

  return (
    <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`} back>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        autoComplete="off"
        size="small"
        labelAlign="left"
        colon={false}
      >
        <Form.Item label="Nama" name="name" key="name">
          <p>{data?.name}</p>
        </Form.Item>
        <Form.Item
          label={data?.type === 1 ? "Persentase" : "Nominal"}
          name="nominal"
          key="nominal"
        >
          <p>
            {" "}
            {/* `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") */}
            {data?.type == 1
              ? `${`${data?.nominal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} %`
              : `Rp. ${`${data?.nominal}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}`}
          </p>
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
          <p>{data?.status === 1 ? "Aktif" : "Non-aktif"}</p>
        </Form.Item>
        <Form.Item label="Kreator" name="creator" key="creator">
          <p>{data?.creator}</p>
        </Form.Item>
        <Form.Item label="Editor" name="editor" key="editor">
          <p>{data?.editor}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
