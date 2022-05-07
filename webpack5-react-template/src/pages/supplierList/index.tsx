import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Tag, Space, Menu, Dropdown, Modal, Form, Input } from "antd";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { suppliers } from "@/mock";
const { Item, useForm } = Form;

export default function supplierList() {

    const actionRef = useRef<ActionType>();
    const [form] = useForm();
    const [modalVisible, setModalVisible] = useState<boolean>();
    const [list, setList] = useState(suppliers);
    const handleFormFinish = (values) => {
        console.log(values)
        suppliers.push({ ...values, id: 7 });
        setList([...suppliers]);
        setModalVisible(false);
    }
    const columns: ProColumns<any>[] = [
        {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
        },
        {
            title: "名称",
            dataIndex: "name",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "此项为必填项",
                    },
                ],
            },
        },
        {
            title: "地址",
            dataIndex: "address",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "此项为必填项",
                    },
                ],
            },
        },
        {
            title: "联系人姓名",
            dataIndex: "linkman",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "此项为必填项",
                    },
                ],
            },
        },
        {
            title: "联系人电话",
            dataIndex: "phone",
            copyable: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: "此项为必填项",
                    },
                ],
            },
        },
        {
            disable: true,
            title: "供货类型",
            dataIndex: "type",
            valueType: "select",
            valueEnum: {
                all: { text: "全部", status: "Default" },
                open: {
                    text: "未解决",
                    status: "Error",
                },
                closed: {
                    text: "已解决",
                    status: "Success",
                    disabled: true,
                },
                processing: {
                    text: "解决中",
                    status: "Processing",
                },
            },
        },
        {
            title: "操作",
            valueType: "option",
            key: "option",
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        console.log("编辑");
                    }}
                >
                    编辑
                </a>,
                <a
                    key="view"
                    onClick={() => {
                        console.log(record);
                        suppliers.splice(suppliers.indexOf(record),1);
                        setList([...suppliers]);
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];
    useEffect(() => {
        console.log('change', list);
        actionRef.current.reload();
    }, [list]);
    return (
        <div>
            <h2>供应商信息管理</h2>
            <ProTable<any>
                columns={columns}
                actionRef={actionRef}
                onSubmit={(v) => { if (v.name) { setList(list.filter(item => item.name.indexOf(v.name) !== -1)) } }}
                dataSource={list}
                cardBordered
                editable={{
                    type: "multiple",
                }}
                columnsState={{
                    persistenceKey: "pro-table-singe-demos",
                    persistenceType: "localStorage",
                    onChange(value) {
                        console.log("value: ", value);
                    },
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
                headerTitle="供应商列表"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
                        新建
                    </Button>,
                ]}
            />
            <Modal visible={modalVisible} footer={[
                <Button onClick={() => setModalVisible(false)}>取消</Button>,
                <Button type="primary" onClick={form.submit}>确定</Button>
            ]
            }>
                <Form form={form} onFinish={handleFormFinish}>
                    <Item name="name" label="姓名">
                        <Input />
                    </Item>
                    <Item name="address" label="地址">
                        <Input />
                    </Item>
                    <Item name="linkman" label="联系人姓名">
                        <Input />
                    </Item>
                    <Item name="phone" label="电话">
                        <Input />
                    </Item>
                    <Item name="type" label="供货类型">
                        <Input />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}
