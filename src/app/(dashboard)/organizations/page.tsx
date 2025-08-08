"use client";

import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

export default function CategoryList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  console.log("🚀 ~ CategoryList ~ tableProps:", tableProps);
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="slug" title={"Slug"} />
        {/* <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        /> */}
      </Table>
    </List>
  );
}
