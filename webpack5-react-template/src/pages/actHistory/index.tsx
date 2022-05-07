import React, { useState, useEffect } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table } from "antd";
import ProForm, {
    ProFormText,
    ProFormSelect,
    QueryFilter,
} from "@ant-design/pro-form";
import { act } from "@/mock/act";
import { actRule } from "@/mock/act";
import dayjs from 'dayjs';
const columns = [
    {
        title: "活动名称",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "活动创建人",
        dataIndex: "creator",
        key: "age",
    },
    {
        title: "活动规则",
        dataIndex: "rule",
        key: "address",
        render: (text) => <div>{actRule.find(i => i.id===text).name}</div>
    },
    {
        title: "开始时间",
        dataIndex: "startTime",
        key: "score",
        render: (text) => <a>{dayjs(text).format('YYYY:MM:DD HH:mm:ss')}</a>,
    },
    {
        title: "结束时间",
        dataIndex: "endTime",
        key: "phone",
        render: (text) => <a>{dayjs(text).format('YYYY:MM:DD HH:mm:ss')}</a>,
    },
    {
        title: "操作",
        key: "action",
        render: () => (
            <Space size="middle">
                <Button >查看</Button>
                <Button danger>删除</Button>
            </Space>
        ),
    },
];

export default function ActHistory() {
    const [list,setList] = useState(act);
    return (
        <div>
            <h2>历史活动管理</h2>
            <QueryFilter<{
                name: string;
            }>
                onFinish={async (values) => {
                    console.log(values.name);
                }}
                className="mb-[24px]"
            >
                <ProFormText
                    name="name"
                    label="活动名称"
                />
            </QueryFilter>
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}
