import React, { useState, useEffect } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table, Divider, Modal, Select, Popconfirm } from "antd";
import ProForm, {
  ProFormText,
  ProFormSelect,
  QueryFilter,
} from "@ant-design/pro-form";
import { deleteUser, getUsersList, getRoleList, updateUser } from "@/request/axios";
const { Option } = Select;
export default function User() {
  const [list, setList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [newRoles, setNewRoles] = useState([]);
  const [currentId, serCurrentId] = useState();
  const fetchData = async (name?) => {
    const res = await getUsersList(name);
    console.log('获取用户列表', res, name);
    setList(res?.data?.data);
  }
  const fetchRoles = async () => {
    const res = await getRoleList();
    console.log(res);
    setRoles(res.data.data)
  }
  const handleDelete = async (item) => {
    await deleteUser(item.id);
    fetchData();
  }
  const handleUpdateUser = async (item) => {
    console.log('编辑角色', item);
    serCurrentId(item.id);
    const tmp = []
    item?.role?.forEach((i) => {
      tmp.push(i.id);
    });
    setNewRoles(tmp);
    setShowModal(true);
  }
  const update = async (roles) => {
    await updateUser(currentId, roles.toString(','))
    setShowModal(false);
    fetchData();
  }
  const handleSearchUser = async (item) => {
    fetchData(item.name);
  }
  useEffect(() => {
    fetchData();
    fetchRoles();
  }, [])
  const columns = [
    {
      title: "用户名称",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "用户手机",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div>{text === 0 ? '女' : '男'}</div>
    },
    {
      title: "用户角色",
      dataIndex: "role",
      key: "role",
      render: (item) => item.map(i => <div>{i.label}</div>)
    },
    {
      title: "用户昵称",
      dataIndex: "nickName",
      key: "nickName",
    },
    {
      title: "工作时间",
      dataIndex: "workTime",
      key: "workTime",
    },
    {
      title: "操作",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Popconfirm placement="topLeft" title="确定删除该用户吗？" onConfirm={() => handleDelete(item)} okText="Yes" cancelText="No">
            <Button danger >删除</Button>
          </Popconfirm>
          <Button onClick={() => handleUpdateUser(item)} >编辑角色</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h2>用户管理</h2>
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
          label="用户名称"
        />
      </QueryFilter>
      <Table pagination={false} columns={columns} dataSource={list} rowKey={(item) => item.id} />;
      <Modal visible={showModal} onCancel={() => setShowModal(false)} maskClosable={false} onOk={() => update(newRoles)}>
        <h4>编辑用户角色</h4>
        <Select mode="tags" value={newRoles} onChange={(value) => { setNewRoles(value) }} className="min-w-[260px]">
          {
            roles.map(item => {
              return (
                <Option value={item.id} key={item.id}>{item.label}</Option>
              )
            })
          }
        </Select>
      </Modal>
    </div>
  );
}
