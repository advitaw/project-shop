import React, { useState, useEffect } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table } from "antd";
import ProForm, {
    ProFormText,
    ProFormSelect,
    QueryFilter,
} from "@ant-design/pro-form";
import { order } from "@/mock/oreder";
import { suppliers } from "@/mock";
import { goods } from "@/mock/goods";
import dayjs from 'dayjs';
const columns = [
    {
        title: "供货商名称",
        dataIndex: "supplier",
        key: "supplier",
        render: (text) => <div>{suppliers[text].name}</div>,
    },
    {
        title: "商品名",
        dataIndex: "goods",
        key: "goods",
        render: (text) => <div>{goods[text].title}</div>,
    },
    {
        title: "数量",
        dataIndex: "num",
        key: "num",
    },
    {
        title: "日期",
        dataIndex: "date",
        key: "name",
        render: (text) => <a>{dayjs(text).format('YYYY:MM:DD HH:mm:ss')}</a>,
    },
    {
        title: "操作",
        key: "action",
        render: () => (
            <Space size="middle">
                <Button danger>删除</Button>
            </Space>
        ),
    },
];
export default function OrderList() {
    const [list,setList] = useState(order);
    return (
        <div>
            <h2>供货商订单管理</h2>
            <QueryFilter<{
                name: string;
                date: string;
            }>
                onFinish={async (values) => {
                    console.log(values.name);
                    if(values.name) {
                        const tmp = order.filter((item)=>{
                            return suppliers[item.supplier].name.indexOf(values.name) !== -1
                        })
                        setList(tmp);
                    }
                    else {
                        setList(order);
                    }
                }}
                className="mb-[24px]"
            >
                <ProFormText
                    name="name"
                    label="供货商名称"
                />
                <ProFormSelect name="date" label="日期" />
            </QueryFilter>
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}
