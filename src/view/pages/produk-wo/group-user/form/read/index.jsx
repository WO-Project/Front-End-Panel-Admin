import { useHistory, useParams } from "react-router-dom";

import { Button, Form, Space, Spin } from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

import { useCommisionDetail } from "../../../../../../api/komisi";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";

const index = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    data: commision_detail_data,
    err: commision_detail_error,
    loading: commision_detail_loading,
  } = useCommisionDetail(id);

  if (commision_detail_loading) return <LoadingSpinner />;
  if (commision_detail_error) return <ErrorPage message={error} />;

  return (
    <CardForm
      title={`Detail Data Kategori Komisi/Group User ${commision_detail_data?.name}`}
      back
    >
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
          <p>{commision_detail_data?.name}</p>
        </Form.Item>
        <Form.Item label="WO" name="wedding_organizer" key="wedding_organizer">
          <p>{commision_detail_data?.wedding_organizer?.name}</p>
        </Form.Item>
        <Form.Item
          label={commision_detail_data?.type === 1 ? "Persentase" : "Nominal"}
          name="nominal"
          key="nominal"
        >
          <p>
            {commision_detail_data?.type == 1
              ? `${`${commision_detail_data?.nominal}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )} %`
              : `Rp. ${`${commision_detail_data?.nominal}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}`}
          </p>
        </Form.Item>
        <Form.Item label="Status" name="status" key="status">
          <p>{commision_detail_data?.status === 1 ? "Aktif" : "Non-aktif"}</p>
        </Form.Item>
        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{commision_detail_data?.creator}</p>
        </Form.Item>
        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(commision_detail_data?.created_at)}</p>
        </Form.Item>
        <Form.Item label="Diubah Oleh" name="editor">
          <p>{commision_detail_data?.editor}</p>
        </Form.Item>
        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(commision_detail_data?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
