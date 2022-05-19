import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table } from "antd";
import { goods } from "@/mock/goods";
import dayjs from 'dayjs'
import ProForm, {
    ProFormText,
    ProFormSelect,
    QueryFilter,
    ProFormMoney
} from "@ant-design/pro-form";
import { order } from "@/mock/oreder";
import { act } from "@/mock/act";
const columns = [
    {
        title: "日期",
        dataIndex: "date",
        key: "name",
        render: (text) => <a>{dayjs(text).format('YYYY:MM:DD HH:mm:ss')}</a>,
    },
    {
        title: "商品名",
        dataIndex: "goods",
        key: "age",
        render: (text) => <div>{goods[text]?.title}</div>
    },
    {
        title: "数量",
        dataIndex: "num",
        key: "address",
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
export default function StockIn() {
    const [scene, setScene] = useState<string>();
    const [list, setList] = useState<any[]>();
    const [money, setMoney] = useState<number>();
    const formRef = useRef()
    useEffect(() => {
        if (location.pathname === "/stockManagement/stockIn") {
            setScene("in");
        } else {
            setScene("out");
        }
    }, []);
    useEffect(() => {
        if (scene === 'in') {
            const tmp = order.filter((item) => {
                return item.type === 1;
            })
            setList(tmp);
        } else {
            const tmp = order.filter((item) => {
                return item.type === 0;
            })
            setList(tmp);
        }
    }, [scene]);
    return (
        <div>
            <h2>{scene === "in" ? "商品入库" : "商品出库"}</h2>
            <ProForm<{
                name: string;
                company?: string;
                useMode?: string;
            }> layout="vertical"
                onFinish={async (v) => setList([{ date: new Date().valueOf(), goods: v.name, ...v }, ...list])}
                formRef={formRef}
                onValuesChange={()=>{
                   const value = ((formRef?.current) as any)?.getFieldValue('act')
                   console.log('v',value);
                   if(value!==null && value !==undefined) {
                       setMoney(80);
                   }
                }}
            >

                <ProFormSelect
                    label="商品"
                    name="name"
                    request={async () => {
                        const tmp = []
                        goods.forEach((item) => {
                            tmp.push({ value: item.id, label: item?.title })
                        })
                        return tmp;
                    }}
                    placeholder="请选择商品"
                />
                <ProFormText
                    name="num"
                    width="md"
                    label={`${scene === "in" ? "进货量" : "出货量"}`}
                    placeholder="请输入数量"
                />
                {
                    scene === 'out' ?
                        <div>
                            <ProFormSelect
                                name="act"
                                request={async () => {
                                    const tmp = []
                                    act.forEach((item) => {
                                        tmp.push({ value: item.id, label: item?.name })
                                    })
                                    return tmp;
                                }}
                                label='活动'
                            />
                            {
                                money ?
                            <h2 className='mb-[18px]'>
                                参与活动后金额： {money}元
                            </h2>
                            : null
                            }
                        </div>
                        : null

                }
            </ProForm>
            <h2 className="mt-[24px]">
                最近{`${scene === "in" ? "进货记录" : "出货记录"}`}
            </h2>
            <QueryFilter<{
                name: string;
                date: string;
            }>
                onFinish={async (values) => {
                    console.log(values.name);
                }}
                className="mb-[24px]"
            >
                <ProFormText
                    name="name"
                    label="商品名称"
                />
                <ProFormSelect name="date" label="日期" />
            </QueryFilter>
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}
