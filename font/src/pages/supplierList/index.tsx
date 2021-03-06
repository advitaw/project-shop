import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Tag, Space, Menu, Dropdown, Modal, Form, Input, Select, Popconfirm } from "antd";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { suppliers } from "@/mock";
import { getSupplier, addSupplier, updateSupplier, deleteSupplier, getCat } from "@/request/axios";;
const { Item, useForm } = Form;
const { Option } = Select
export default function supplierList() {

    const actionRef = useRef<ActionType>();
    const [form] = useForm();
    const [modalVisible, setModalVisible] = useState<boolean>();
    const [list, setList] = useState();
    const [catMap, setCatMap] = useState({})
    const [mode, setMode] = useState('');
    const [id, setId] = useState();
    const handleFormFinish = (values) => {
        console.log(values)
        setModalVisible(false);
    }
    const fetchData = async (v?) => {
        console.log(v);
        const { name, phone, linkman, address, type } = v || {}
        const res = await getSupplier(name, phone, linkman, address, type);
        setList(res?.data?.data)
    }
    const fetchCat = async () => {
        const res = await getCat();
        const list = res?.data?.data;
        const tmp = {}
        for (let i = list?.length - 1; i > -1; i--) {
            tmp[list[i].id] = list[i].label
        }
        setCatMap(tmp)
    }
    const add = async () => {
        const value = form.getFieldsValue()
        const { name, phone, linkman, address, type } = value
        await addSupplier(name, address, phone, linkman, type)
        fetchData();
        setModalVisible(false)
    }
    const handleEdit = (item) => {
        form.setFieldsValue(item);
        setId(item.id)
        setModalVisible(true)
        setMode('edit')
    }
    const update = async () => {
        const value = form.getFieldsValue()
        const { name, phone, linkman, address, type } = value
        await updateSupplier(id, name, address, phone, linkman, type)
        fetchData();
        setModalVisible(false)
    }
    useEffect(() => {
        fetchData()
        fetchCat();
    }, []);
    const columns: ProColumns<any>[] = [
        {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
        },
        {
            title: "??????",
            dataIndex: "name",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "??????????????????",
                    },
                ],
            },
        },
        {
            title: "??????",
            dataIndex: "address",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "??????????????????",
                    },
                ],
            },
        },
        {
            title: "???????????????",
            dataIndex: "linkman",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "??????????????????",
                    },
                ],
            },
        },
        {
            title: "???????????????",
            dataIndex: "phone",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "??????????????????",
                    },
                ],
            },
        },
        {
            disable: true,
            title: "????????????",
            dataIndex: "type",
            valueType: "select",
            valueEnum: catMap,
            render: (text, record) => { return <div>{record?.category?.label}</div> }
        },
        {
            title: "??????",
            valueType: "option",
            key: "option",
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        console.log("??????", record);
                        handleEdit(record)
                    }}
                >
                    ??????
                </a>,
                <Popconfirm placement="topLeft" title="??????????????????" onConfirm={async () => { await deleteSupplier(record.id); fetchData() }} okText="Yes" cancelText="No">
                    <a
                        key="view"
                    >
                        ??????
                    </a>,
                </Popconfirm>
            ],
        },
    ];
    return (
        <div>
            <h2>?????????????????????</h2>
            <ProTable<any>
                columns={columns}
                actionRef={actionRef}
                onSubmit={(v) => { fetchData(v) }}
                dataSource={list}
                cardBordered
                editable={{
                    type: "multiple",
                }}
                columnsState={{
                    persistenceKey: "pro-table-singe-demos",
                    persistenceType: "localStorage",
                }}
                rowKey="name"
                search={{
                    labelWidth: "auto",
                }}
                form={{
                    syncToUrl: (values, type) => {
                        if (type === "get") {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 20,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="???????????????"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { setModalVisible(true); setMode('add') }}>
                        ??????
                    </Button>,
                ]}
            />
            <Modal visible={modalVisible} footer={[
                <Button onClick={() => setModalVisible(false)}>??????</Button>,
                <Button type="primary" onClick={mode === 'add' ? add : update}>??????</Button>
            ]
            }>
                <Form form={form} onFinish={handleFormFinish}>
                    <Item name="name" label="??????">
                        <Input />
                    </Item>
                    <Item name="address" label="??????">
                        <Input />
                    </Item>
                    <Item name="linkman" label="???????????????">
                        <Input />
                    </Item>
                    <Item name="phone" label="??????">
                        <Input />
                    </Item>
                    <Item name="type" label="????????????">
                        <Select>
                            {
                                catMap && Object.keys(catMap).map((item) => {
                                    return <Option value={item}>{catMap[item]}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}
