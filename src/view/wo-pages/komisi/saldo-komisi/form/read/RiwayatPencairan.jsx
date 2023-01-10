import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { getOneDisbursement } from "../../../../../../api/disbursement/getOneDisbursement";
import { asset } from "../../../../../../configs/apiConfig";

import { Button, Form, Space } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const { id } = useParams("id");
  console.log(id);
  const { data, error, loading } = getOneDisbursement(id);

  if (error)
    return <ErrorPage message="Gagal mengambil data detail artikel!" />;
  if (loading) return <LoadingSpinner />;

  return (
    <CardForm title={`Detail Pencairan`} back>
      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
        size="small"
      >
        <Form.Item label="Disbursement Name" name="disbursement name">
          <p>{data && data.disbursement_name}</p>
        </Form.Item>

        <Form.Item label="Disbursement Status" name="disbursement status">
          <p>{data && data.status == 1 ? "Unpaid" : "Paid"}</p>
        </Form.Item>

        <Form.Item label="Request Date" name="request date">
          <p>{data && data.request_date}</p>
        </Form.Item>

        <Form.Item label="Request Nominal" name="request nominal">
          <p>{data && data.request_nominal}</p>
        </Form.Item>

        <Form.Item label="Disbursement Type" name="disbursement type">
          <p>{data && data.disbursement_type === 1 ? "Percent" : "Nominal"}</p>
        </Form.Item>

        <Form.Item label="Disbursement Bank" name="disbursement bank">
          <p>{data && data.disbursement_bank}</p>
        </Form.Item>

        <Form.Item label="Disbursement Norek" name="disbursement norek">
          <p>{data && data.disbursement_norek}</p>
        </Form.Item>

        <Form.Item label="Disbursement Nominal" name="disbursement nominal">
          <p>{data && data.disbursement_nominal}</p>
        </Form.Item>

        <Form.Item label="Bukti Transfer" name="proof">
          <img
            src={asset(data.disbursement_proof)}
            alt="proof"
            style={{ width: 250, height: 250 }}
          />
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
