import React, { useState, useEffect } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table, Modal, Select, Form, Input } from "antd";
import ProForm, {
  ProFormText,
  ProFormSelect,
  QueryFilter,
} from "@ant-design/pro-form";
import { deleteVip, getVipList, updateVip, addVip } from "@/request/axios";
const { Option } = Select;
const { Item, useForm } = Form;
let mode = null

export default function VipAdd() {
  const [list, setList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const fetchData = async (name?) => {
    const res = await getVipList(name);
    console.log('获取vip列表', res, name);
    setList(res?.data?.data);
  }
  const handleDelete = async (item) => {
    await deleteVip(item.id);
    fetchData();
  }
  const update = async () => {
    const { id, name, sex, phone, score } = form.getFieldsValue();
    await updateVip(id, name, sex, phone, score)
    setShowModal(false);
    fetchData();
  }
  const add = async () => {
    const { name, sex, phone, score } = form.getFieldsValue();
    await addVip(name, sex, phone, score)
    setShowModal(false);
    fetchData();
  }
  const handleSearchUser = async (item) => {
    fetchData(item.name);
  }
  const handleUpdate = async (item) => {
    mode = 'update'
    form.setFieldsValue(item);
    setShowModal(true);
  }
  const handleAdd = async () => {
    mode = 'add'
    setShowModal(true);
  }
  useEffect(() => {
    fetchData();
  }, [])
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
          <Button onClick={() => handleUpdate(item)}>编辑</Button>
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
          handleSearchUser(values);
        }}
        className="mb-[8px]"
      >
        <ProFormText
          name="name"
          label="会员名称"
        />
      </QueryFilter>
      <Button type="primary" className="mb-[12px]" onClick={handleAdd}>新增</Button>
      <Table columns={columns} dataSource={list} rowKey={(item) => item.id} />;
      <Modal visible={showModal} onCancel={() => setShowModal(false)} maskClosable={false} onOk={() => mode === 'add' ? add() : update()}>
        <h4>编辑vip信息</h4>
        <Form form={form}>
          <Item name="name" label="会员名称">
            < Input />
          </Item>
          <Item name="phone" label="手机号">
            < Input />
          </Item>
          <Item name="age" label="会员年龄">
            < Input />
          </Item>
          <Item name="score" label="会员积分">
            < Input />
          </Item>
          <Item name="id" label="会员id">
            < Input disabled />
          </Item>
          <Item name="sex" label="会员性别">
            <Select>
              <Option value={1}>男</Option>
              <Option value={0}>女</Option>
            </Select>
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
