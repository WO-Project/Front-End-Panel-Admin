const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => <>{new Date(date).toLocaleString("en-GB")}</>,
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    ...getColumnSearchProps("date"),
  },

  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type) => <>{type == 1 ? "Percent" : "Direct"}</>,
  },

  {
    title: "Nominal",
    dataIndex: "nominal",
    key: "nominal",
  },

  {
    title: "WO",
    dataIndex: "wo",
    key: "wo",
  },

  // Kolom aksi
  {
    title: "Action",
    key: "action",
    render: (payload) => (
      <Space size="large" className="icons-container">
        {payload.permission.includes(
          "/admin/riwayat-komisi-admin/detail/:userid"
        ) ? (
          <Popover content={"Detail"}>
            <Link
              to={{
                pathname: `/admin/riwayat-komisi-admin/detail/${payload.id}`,
                state: {
                  permission: "Detail",
                  data: "Pesanan",
                  id: payload.id,
                },
              }}
            >
              <Eye size={20} />
            </Link>
          </Popover>
        ) : undefined}

        {payload.permission.includes("delete riwayat komisi admin") ? (
          <Popover content={"Delete"}>
            <Trash
              color="red"
              size={20}
              className="trash"
              onClick={() =>
                showModal(
                  payload.id,
                  payload.name,
                  payload.wo,
                  payload.deletePesanan
                )
              }
            />
          </Popover>
        ) : undefined}
      </Space>
    ),
  },
];

export default columns;
