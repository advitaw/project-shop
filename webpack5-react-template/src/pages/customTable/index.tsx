import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Tag, Space, Menu, Dropdown, Modal, Form, Input, Divider } from "antd";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { suppliers } from "@/mock";
import dayjs from 'dayjs';
import { vips } from "@/mock";
import { goods } from "@/mock/goods";
import { act } from "@/mock/act";
import { order } from "@/mock/oreder";

const { Item, useForm } = Form;

export default function CustomTable() {
    const actionRef = useRef<ActionType>();
    const [form] = useForm();
    const [modalVisible, setModalVisible] = useState<boolean>();
    const [list, setList] = useState(order);
    const handleFormFinish = (values) => {
        console.log(values)
        order.push({ ...values, id: 7 });
        setList([...order]);
        setModalVisible(false);
    }
    const columns: ProColumns<any>[] = [
        {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
        },
        {
            title: "时间",
            dataIndex: "date",
            valueType: 'date',
            render: (text: string, item) => {
                return (
                    <div>
                        {dayjs(item.date).format('YYYY年MM月DD日 HH:mm:ss')}
                    </div>
                )
            }
        },
        {
            title: "订单类型",
            dataIndex: "type",
            render: (text) => { return <div>{text === 0 ? '卖货' : '进货'}</div> }
        },
        {
            title: "金额",
            dataIndex: "amount",
            render: (text) => { return <div>{text}元</div> }
        },
        {
            title: "商品",
            dataIndex: "goods",
            render: (text: number) => { return <div>{goods[text]?.title}</div> }
        },
        {
            title: "数量",
            dataIndex: "num",
            render: (text) => { return <div>{text}个</div> }
        },
        {
            title: "活动",
            dataIndex: " activity",
            render: (text: number) => { return <div>{act[text]?.name}</div> }
        },
        {
            title: "供应商",
            dataIndex: "supplier",
            render: (text: number) => { return <div>{suppliers[text]?.name}</div> }
        },
        {
            title: "会员",
            dataIndex: "vip",
            render: (text: number) => { return <div>{vips[text]?.name}</div> }
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
                        suppliers.splice(suppliers.indexOf(record), 1);
                        setList([...order]);
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];
    const handleFilter = (v) => {
        console.warn(v)
        if(v.date) {
           const tmp = order.filter((item)=>{
               return dayjs(item.date).isSame(v.date,'day');
           })
           setList(tmp);
        }
    }
    useEffect(() => {
        console.log('change', list);
        actionRef.current.reload();
    }, [list]);
    return (
        <div>
            <h2>自定义报表</h2>
            <ProTable<any>
                columns={columns}
                actionRef={actionRef}
                onSubmit={handleFilter}
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
