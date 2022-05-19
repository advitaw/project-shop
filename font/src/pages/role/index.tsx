import React, { useEffect, useState } from "react";
import { Card, Modal, Popconfirm, Button, Form, Input, Select, message } from 'antd';
import { getRoleList, deleteRole, addRole, updateRole } from "@/request/axios";
import { UserOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { componentsMap, listMap } from '@/mock/index'
const { Item, useForm } = Form
const { Option } = Select
let preValue: any = null
export default function Role() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const fetchData = async () => {
    const res = await getRoleList();
    console.log(res);
    setRoles(res.data.data)
  }
  const editCard = (item) => {
    console.log(item)
    form.setFieldsValue({
      label: item.label,
      pageList: item?.pageList?.split(','),
      disabledComponents: item?.disabledComponents?.split(',')
    });
    preValue = item;
    setShowModal(true);
  }
  const handleDeleteCard = async (e, item) => {
    e.stopPropagation();
    console.log(item)
    await deleteRole(item.id);
    fetchData();
  }
  const handleAddRole = async () => {
    if (preValue) {
      console.warn('编辑')
      const value = form.getFieldsValue();
      await updateRole(preValue?.id, value.label, value?.pageList?.toString(','), value?.disabledComponents?.toString(','));
      setShowModal(false);
      fetchData();
      preValue = null;
      return;
    }
    const value = form.getFieldsValue();
    console.log(value);
    const res = await addRole(value.label, value?.pageList?.toString(','), value?.disabledComponents?.toString(','));
    console.log(res);
    if (res.data.code === 100) {
      message.error('角色名重复，请重新输入')
    } else if (res.data.code === 0) {
      setShowModal(false);
      fetchData();
    } else {
      message.error('系统繁忙，请重试！')
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    console.log(roles);
  }, [roles])
  return (
    <div>
      <h2>角色管理</h2>
      <Button type="primary" onClick={() => { setShowModal(true); form.resetFields() }}>添加角色</Button>
      <div className="flex w-[100%] flex-row flex-wrap">
        {roles?.length > 0 ?
          roles?.map((item) => {
            return (
              <Card
                hoverable
                className="m-[16px]"
                key={item.id}
                style={{ width: 300 }}
                actions={[
                  <Popconfirm placement="topLeft" title="确定删除该角色吗？" onConfirm={(e) => handleDeleteCard(e, item)} okText="Yes" cancelText="No">
                    <CloseOutlined key="del" onClick={(e) => e.stopPropagation()} />
                  </Popconfirm>
                  ,
                  <EditOutlined key="edit" />,
                ]}
                onClick={() => editCard(item)}
              >
                <div className='flex flex-col items-center justify-center'>
                  <UserOutlined style={{ fontSize: '56px', color: 'grey', marginBottom: '5px' }} />
                  <div className='w-[100%]'>
                    <span className="text-[#0ea5e9]">角色名称：</span>
                    <span>{item?.label}</span>
                    <div className="text-[#0ea5e9]">可访问页面：</div>
                    <div className='h-[30px] overflow-hidden text-ellipsis whitespace-nowrap'>
                      {
                        item.pageList ?
                          item.pageList?.split(',').map((page) => {
                            return (
                              <span>{listMap[page]}页 </span>
                            )
                          })
                          : '无'
                      }
                    </div>
                    <div className="text-[#0ea5e9]">禁止访问的组件：</div>
                    <div className='h-[30px] overflow-hidden text-ellipsis whitespace-nowrap'>
                      {
                        item.disabledComponents ?
                          item.disabledComponents?.split(',').map((com) => {
                            return (
                              <span>{componentsMap[com]} </span>
                            )
                          })
                          : '无'
                      }
                    </div>
                  </div>
                </div>
              </Card>
            );
          }) : null
        }
      </div>
      <Modal visible={showModal} onCancel={() => setShowModal(false)} maskClosable={false} onOk={handleAddRole}>
        <Form form={form} className='mt-[18px]'>
          <Item name="label" label="角色名称">
            <Input></Input>
          </Item>
          <Item name="pageList" label="可访问页面">
            <Select mode="multiple">
              {
                Object.keys(listMap).map((key) => {
                  return (
                    <Option value={key} key={key} >{listMap[key]}</Option>
                  )
                })
              }
            </Select>
          </Item>
          <Item name="disabledComponents" label="不可访问组件">
            <Select mode="multiple">
              {
                Object.keys(componentsMap).map((key) => {
                  return (
                    <Option value={key} key={key} >{componentsMap[key]}</Option>
                  )
                })
              }
            </Select>
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
