import React, { useState, useEffect } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table } from "antd";
import ProForm, {
    ProFormText,
    ProFormSelect,
    QueryFilter,
    ProFormDatePicker
} from "@ant-design/pro-form";
import { getOrder, getAct, getGoodsList, getSupplier, getVipList, deleteOrder } from "@/request/axios";

export default function OrderList() {
    const [list, setList] = useState([]);
    const [maps, setMaps] = useState({});
    const getMap = (arr) => {
        const tmp = {}
        arr.forEach((i) => {
            tmp[i.id] = i.name || i.title
        })
        return tmp
    }

    const goodAdapter = (text) => {
        const goods = text.split(',');
        const res = [];
        goods.map(i => {
            const info = i.split('*');
            res.push(`${maps?.good[info[0]]}${info[1]}件`);
        })
        return res;
    }
    const fetchMap = async () => {
        const res = await Promise.all([getGoodsList(), getSupplier()])
        console.log(res);
        setMaps({
            good: getMap(res[0].data.data),
            sup: getMap(res[1].data.data),
        })
    }
    const fetchData = async (date?, sup?) => {
        const res = await getOrder(date, 0, sup)
        setList(res.data.data)
    }
    useEffect(() => {
        fetchData();
        fetchMap();
    }, [])
    const columns = [
        {
            title: "供货商名称",
            dataIndex: "supplier",
            key: "supplier",
            render: (text) => <div>{text.name}</div>,
        },
        {
            title: "商品",
            dataIndex: "list",
            key: "goods",
            render: (text) => <div>{goodAdapter(text).map(i => <span>{i} </span>)}</div>,
        },
        {
            title: "日期",
            dataIndex: "date",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button danger onClick={async () => {
                        await deleteOrder(record.id)
                        fetchData()
                    }}>删除</Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h2>供货商订单管理</h2>
            <QueryFilter<{
                name: string;
                date: string;
            }>
                onFinish={async (values) => {
                    console.log(values);
                    fetchData(values.date, values.name)
                }}
                className="mb-[24px]"
            >
                <ProFormSelect
                    name="name"
                    label="供货商名称"
                    valueEnum={maps?.sup}
                />
                <ProFormDatePicker name="date" label="日期" />
            </QueryFilter>
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}
