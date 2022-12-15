import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { createProdukWO } from "../../../../../../api/produk-wo";
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
} from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getProducts } from "../../../../../../api/produk/getProducts";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = () => {
  const history = useHistory();

  const [wo, setWO] = useState();
  const [bride, setBride] = useState();
  const [product, setProduct] = useState();
  const [quota, setQuota] = useState();
  const [activeDate, setActiveDate] = useState();

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

  const onFinish = async () => {
    const success = await createProdukWO({
      wedding_organizer_id: wo,
      bride_id: bride,
      product_id: product,
      quota,
      active_date: activeDate,
    });

    console.log(success);
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

  if (wo_err || brides_error || product_error)
    return <ErrorPage message="Gagal Mengambil Data" />;

  return (
    <CardForm title="Tambah Data User">
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
        >
          {wo_loading ? (
            <Select loading showSearch placeholder="Pilih WO" />
          ) : wo_data[0] === null || wo_data.length === 0 ? (
            <Select
              showSearch
              placeholder="Tambah WO terlebih dahulu!"
              disabled
            />
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
              options={
                wo_data[0] != null
                  ? wo_data.map((v) => ({
                      value: v.id,
                      label: v.name,
                    }))
                  : []
              }
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
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            value={activeDate}
            onChange={(value, stringValue) => setActiveDate(stringValue)}
          />
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
