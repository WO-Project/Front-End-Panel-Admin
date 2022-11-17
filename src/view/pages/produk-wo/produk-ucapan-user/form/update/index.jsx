import { useHistory, useParams } from "react-router-dom";

import { Form, Button, Spin } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

import { detailProdukWO } from "../../../../../../api/produk-wo";

import "./style.css";

const index = () => {
  const history = useHistory();
  const { id } = useParams();

  const { data, err, loading } = detailProdukWO(id);

  if (loading)
    return (
      <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`}>
        <Spin />
      </CardForm>
    );

  if (err) return <ErrorPage message={err} />;

  return (
    <CardForm title={`Detail Data Produk Ucapan WO ${data?.name}`}>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 13,
        }}
        autoComplete="off"
        disabled={true}
      >
        <Form.Item label="WO" name="wedding_organizer_name" key="wo_name">
          <p>{data?.wedding_organizer?.name}</p>
        </Form.Item>

        <Form.Item label="Produk" name="product_name" key="product_name">
          <p>{data?.product?.name}</p>
        </Form.Item>

        <Form.Item label="Pengantin Pria" name="groom" key="groom">
          <p>{data?.bride?.groom}</p>
        </Form.Item>

        <Form.Item label="Pengantin Perempuan" name="bride" key="bride">
          <p>{data?.bride?.bride}</p>
        </Form.Item>

        <Form.Item label="Kuota" name="quota" key="quota">
          <p>{data?.quota}</p>
        </Form.Item>

        <Form.Item label="Tanggal Aktif" name="active_date" key="active_date">
          <p>{data?.active_date}</p>
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
      </Form>

      <Button danger onClick={() => history.goBack()}>
        Kembali
      </Button>
    </CardForm>
  );
};

export default index;
