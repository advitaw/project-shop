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
import { getOrder, getAct, getGoodsList, getSupplier, getVipList, deleteOrder } from "@/request/axios";
import Auth from "@/components/Auth";
const { Item, useForm } = Form;
export default function CustomTable() {
    const actionRef = useRef<ActionType>();
    const [form] = useForm();
    const [maps, setMaps] = useState({});
    const handleFormFinish = (values) => {
        console.log(values)
    }
    const getMap = (arr) => {
        const tmp = {}
        arr.forEach((i) => {
            tmp[i.id] = i.name || i.title
        })
        return tmp
    }
    const fetchMap = async () => {
        const res = await Promise.all([getAct(), getGoodsList(), getSupplier(), getVipList()])
        console.log(res);
        setMaps({
            act: getMap(res[0].data.data),
            good: getMap(res[1].data.data),
            sup: getMap(res[2].data.data),
            vip: getMap(res[3].data.data)
        })
    }
    const fetchData = async (params, sort, filter) => {
        console.log('p', params, sort, filter);
        const { activity, amount, current, date, type, vip, pageSize } = params;
        console.log('ts', activity, amount, current, date, type, vip, pageSize)
        const res = await getOrder(date, type, undefined, amount, activity, vip, current, pageSize)
        return {
            success: true,
            data: res.data.data,
            total: res.data.extra
        }
    }
    const goodAdapter = (text) => {
        const goods = text.split(',');
        const res = [];
        goods.map(i => {
            const info = i.split('*');
            res.push(`${maps?.good[info[0]]}${info[1]}???`);
        })
        return res;
    }
    useEffect(() => {
        fetchMap()
    }, [])

    useEffect(() => {
        console.log(maps);
    }, [maps])
    const columns: ProColumns<any>[] = [
        {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
        },
        {
            title: "??????",
            dataIndex: "date",
            valueType: 'date',
            render: (text: string, item) => {
                return (
                    <div>
                        {text}
                    </div>
                )
            }
        },
        {
            title: "????????????",
            dataIndex: "type",
            valueType: 'select',
            valueEnum: {
                0: '??????',
                1: '??????'
            },
            render: (text, record) => { return <div>{record?.type_id == 1 ? '??????' : '??????'}</div> }
        },
        {
            title: "??????",
            dataIndex: "amount",
            render: (text) => { return <div>{text}???</div> }
        },
        {
            title: "??????",
            hideInSearch: true,
            dataIndex: "list",
            render: (text: string) => { return <div>{goodAdapter(text).map(i => <span>{i} </span>)}</div> }
        },
        {
            title: "??????",
            dataIndex: "activity",
            valueType: 'select',
            valueEnum: maps?.act,
            render: (text, record) => { return <div>{record?.activity?.name}</div> }
        },
        {
            title: "?????????",
            hideInSearch: true,
            dataIndex: "supplier",
            valueType: 'select',
            valueEnum: maps?.sup,
            render: (text, record) => { return <div>{record?.supplier?.name}</div> }
        },
        {
            title: "??????",
            dataIndex: "vip",
            valueType: 'select',
            valueEnum: maps?.vip,
            render: (text, record) => { return <div>{record?.vip?.name}</div> }
        },
        {
            title: "??????",
            valueType: "option",
            key: "option",
            render: (text, record, _, action) => [
                <Auth id={'customTable-delete'}> <a
                    key="view"
                    onClick={() => {
                        deleteOrder(record.id)

                    }}
                >
                    ??????
                </a></Auth>
            ],
        },
    ];
    const handleFilter = (v) => {
        console.warn(v)
    }
    return (
        <div>
            <h2>???????????????</h2>
            <ProTable<any>
                columns={columns}
                actionRef={actionRef}
                onSubmit={handleFilter}
                request={fetchData}
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
                headerTitle="??????"
            />
        </div>
    );
}
