import { useHistory, useParams } from "react-router-dom";

import { Form, Button, Spin, Space } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

import { detailAffiliates } from "../../../../../../api/afiliasi";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";

const index = () => {
  const history = useHistory();
  const { id } = useParams();

  console.log(id);
  const { data, err, loading } = detailAffiliates(id);

  if (loading) return <LoadingSpinner />;
  if (err) return <ErrorPage message={err} />;

  return (
    <CardForm title={`Detail Link Afiliasi ${data?.name}`} back>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 13,
        }}
        autoComplete="off"
        size="small"
        labelAlign="left"
        colon={false}
      >
        <Form.Item label="Nama" name="name" key="name">
          <p>{data?.name}</p>
        </Form.Item>
        <Form.Item label="Deskripsi" name="description" key="description">
          <p>{data?.description}</p>
        </Form.Item>
        <Form.Item label="Link" name="link" key="link">
          <p>{data?.link}</p>
        </Form.Item>
        <Form.Item label="Status" name="status" key="status">
          <p>{data?.status === 1 ? "Aktif" : "Non-aktif"}</p>
        </Form.Item>
        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{data?.creator}</p>
        </Form.Item>
        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(data?.created_at)}</p>
        </Form.Item>
        <Form.Item label="Diubah Oleh" name="editor">
          <p>{data?.editor}</p>
        </Form.Item>
        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(data?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
