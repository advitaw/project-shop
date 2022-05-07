import React, { useState, useEffect } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table } from "antd";
import ProForm, {
  ProFormText,
  ProFormSelect,
  QueryFilter,
} from "@ant-design/pro-form";
import { vips } from "@/mock";

export default function VipAdd() {
  const [list, setList] = useState(vips);
  function handleDelete(item) {
    console.log(item);
    const tmp = []
    vips.splice(vips.indexOf(item), 1);
    console.log(vips);
    setList([...vips]);
  }

  const columns = [
    {
      title: "会员名称",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "会员年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "会员性别",
      dataIndex: "sex",
      key: "address",
      render: (text) => <div>{text === 0 ? '女' : '男'}</div>
    },
    {
      title: "会员积分",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "会员手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "操作",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Button danger onClick={() => handleDelete(item)}>删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h2>会员信息管理</h2>
      <QueryFilter<{
        name: string;
      }>
        onFinish={async (values) => {
          const tmp = vips.filter((item) => {
            return item.name.indexOf(values.name) !== -1
          })
          setList(tmp);
        }}
        className="mb-[8px]"
      >
        <ProFormText
          name="name"
          label="会员名称"
        />
      </QueryFilter>
      <Button type="primary" className="mb-[12px]">新增</Button>
      <Table columns={columns} dataSource={list} rowKey={(item) => item.id} />;
    </div>
  );
}
