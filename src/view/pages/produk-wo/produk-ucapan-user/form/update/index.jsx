import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import {
  createProdukWO,
  detailProdukWO,
  updateProdukWO,
} from "../../../../../../api/produk-wo";
import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import { getBrides } from "../../../../../../api/pengantin/getBrides";

import {
  Button,
  Form,
  Space,
  message,
  Select,
  InputNumber,
  DatePicker,
  Spin,
} from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getProducts } from "../../../../../../api/produk/getProducts";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = () => {
  const history = useHistory();
  const { id } = useParams();

  const [wo, setWO] = useState();
  const [bride, setBride] = useState();
  const [product, setProduct] = useState();
  const [quota, setQuota] = useState();
  const [activeDate, setActiveDate] = useState();
  const [status, setStatus] = useState();

  const {
    data: detail_produk_wo,
    err: detail_produk_wo_error,
    loading: detail_produk_wo_loading,
  } = detailProdukWO(id);

  const {
    data: wo_data,
    error: wo_err,
    loading: wo_loading,
  } = getWeddingOrganizers();

  const {
    data: brides_data,
    error: brides_error,
    loading: brides_loading,
  } = getBrides();

  const {
    data: product_data,
    error: product_error,
    loading: product_loading,
  } = getProducts();

  useEffect(() => {
    const wo = detail_produk_wo?.wedding_organizer?.id;
    const bride = detail_produk_wo?.bride?.id;
    const product = detail_produk_wo?.product?.id;
    const quota = detail_produk_wo?.quota;
    const active_date = detail_produk_wo?.active_date;
    const status = detail_produk_wo?.status;

    setWO(wo);
    setBride(bride);
    setProduct(product);
    setQuota(quota);
    setActiveDate(active_date);
    setStatus(status);
  }, [detail_produk_wo]);

  const onFinish = async () => {
    const success = await updateProdukWO(id, {
      wedding_organizer_id: wo,
      bride_id: bride,
      product_id: product,
      quota,
      active_date: activeDate,
      status,
    });

    if (success?.data?.success) {
      message.success("Berhasil menambahkan produk wo");
      history.goBack();
    } else {
      message.error("Gagal menambahkan produk wo");
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  if (detail_produk_wo_loading) return <Spin />;

  if (wo_err || brides_error || product_error || detail_produk_wo_error)
    return <ErrorPage message="Gagal Mengambil Data" />;

  return (
    <CardForm
      title={`Detail Data Produk Ucapan User ${detail_produk_wo?.product?.name}`}
    >
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
        colon={false}
      >
        <Form.Item
          label="WO"
          name="wo"
          rules={[
            {
              required: true,
              message: "Mohon masukkan Wedding Organizer!",
            },
          ]}
          initialValue={wo}
        >
          {wo_loading ? (
            <Select loading showSearch placeholder="Pilih WO" />
          ) : (
            <Select
              showSearch
              placeholder="Pilih WO"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label?.toUpperCase() ?? "").includes(
                  input.toUpperCase()
                )
              }
              options={wo_data?.map((value) => ({
                value: value.id,
                label: value.name,
              }))}
              onChange={(value) => setWO(value)}
              value={wo}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Pengantin"
          name="bride"
          rules={[
            {
              required: true,
              message: "Mohon masukkan pengantin!",
            },
          ]}
          initialValue={bride}
        >
          {brides_loading ? (
            <Select loading showSearch placeholder="Pilih Pengantin" />
          ) : (
            <Select
              showSearch
              placeholder="Pilih Pengantin"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label?.toUpperCase() ?? "").includes(
                  input.toUpperCase()
                )
              }
              options={brides_data?.map((value) => ({
                value: value.id,
                label: `${value.groom} & ${value.bride}`,
              }))}
              onChange={(value) => setBride(value)}
              value={bride}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Produk"
          name="product"
          rules={[
            {
              required: true,
              message: "Mohon masukkan produk!",
            },
          ]}
          initialValue={product}
        >
          {product_loading ? (
            <Select loading showSearch placeholder="Pilih Produk" />
          ) : (
            <Select
              showSearch
              placeholder="Pilih Produk"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label?.toUpperCase() ?? "").includes(
                  input.toUpperCase()
                )
              }
              options={product_data?.map((value) => ({
                value: value.id,
                label: value.name,
              }))}
              onChange={(value) => setProduct(value)}
              value={product}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Kuota"
          name="quota"
          rules={[
            {
              required: true,
              message: "Mohon masukkan kuota!",
            },
          ]}
          initialValue={quota}
        >
          <InputNumber
            style={{ width: "100%" }}
            value={quota}
            onChange={(value) => setQuota(value)}
          />
        </Form.Item>

        <Form.Item
          label="Tanggal Aktivasi"
          name="activate_date"
          rules={[
            {
              required: true,
              message: "Mohon masukkan Tanggal Aktivasi!",
            },
          ]}
          initialValue={moment(activeDate)}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            value={activeDate}
            onChange={(value, stringValue) => setActiveDate(stringValue)}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status!",
            },
          ]}
          initialValue={status}
        >
          <Select value={status} onChange={(value) => setStatus(value)}>
            <Select.Option value={1}>Aktif</Select.Option>
            <Select.Option value={2}>Non-Aktif</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size="middle">
            <Button type="primary" danger htmlType="submit">
              Simpan
            </Button>
            <Button danger htmlType="button" onClick={() => history.goBack()}>
              Batal
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
