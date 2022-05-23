import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Space, Menu, Dropdown, Table, message, Form, Input, Select, Tag } from "antd";
import { goods } from "@/mock/goods";
import dayjs from 'dayjs'
import ProForm, {
    ProFormText,
    ProFormSelect,
    QueryFilter,
    ProFormDatePicker,
    ProFormMoney
} from "@ant-design/pro-form";
import { act } from "@/mock/act";
import { getOrder, getGoodsList, getSupplier, deleteOrder, getAct, getVipList, addOrder, updateGood } from "@/request/axios";
import Auth from "@/components/Auth";
const { Item, useForm } = Form
const { Option } = Select
export default function StockIn() {
    const [form] = useForm();
    const [scene, setScene] = useState<string>();
    const [list, setList] = useState<any[]>();
    const [money, setMoney] = useState<number>();
    const formRef = useRef()
    const [maps, setMaps] = useState();
    const [selected, setSelected] = useState([]);
    const [send, setSend] = useState('')
    const getMap = (arr) => {
        const tmp = {}
        arr.forEach((i) => {
            tmp[i.id] = i.name || i.title
        })
        return tmp
    }
    const getFullMap = (arr) => {
        const tmp = {}
        arr.forEach((i) => {
            tmp[i.id] = i
        })
        return tmp
    }

    const goodAdapter = (text) => {
        if (text) {
            const goods = text.split(',');
            const res = [];
            goods.map(i => {
                const info = i.split('*');
                res.push(`${maps?.good[info[0]].title}${info[1]}件`);
            })
            return res;
        } else {
            return []
        }
    };
    const income = async (name, num, sup_id) => {
        const s = new Date()
        const date = `${s.getFullYear()}-${s.getMonth() + 1 < 10 ? '0' + (s.getMonth() + 1) : s.getMonth() + 1}-${s.getDate() < 10 ? '0' + s.getDate() : s.getDate()}`
        const tmp = {
            list: `${name}*${num}`,
            sup_id,
            date,
            type: 0
        }
        await addOrder(tmp)
        await updateGood({ id: name, total: num })
        fetchData();
        message.success('添加成功')
    }
    const calcPrice = () => {
        console.log(selected)
        let curMoney = 0
        selected.forEach((item) => {
            const price = maps.good[item.good].price
            const m = +price * item.num
            curMoney += m
        })
        const act = ((formRef?.current) as any)?.getFieldValue('act')
        if (act) {
            console.log(maps?.fullAct[act])
            const rule = maps?.fullAct[act].rule;
            const limit = rule.limit.split(',')
            const dec = rule.dec.split(',')
            let i = -1;
            limit.map((item, index) => {
                if (item < curMoney) {
                    i = index
                }
            })
            console.log(limit, dec, i)
            if (i !== -1) {
                console.log(rule.type, dec[i])
                switch (rule.type) {
                    case 0:
                        setMoney(curMoney - +dec[i]);
                        setSend('')
                        break
                    case 1:
                        const discount = +`0.${dec[i]}`
                        setSend('')
                        setMoney(curMoney * discount);
                        break
                    case 2:
                        setMoney(curMoney);
                        setSend(`赠送${dec[i]}`)
                        break
                }
            } else {
                setMoney(curMoney);
            }
        }
    }
    const outCome = async (v) => {
        console.log(v)
        const list = []
        selected.forEach(item => {
            list.push(`${item.good}*${item.num}`)
        })
        const { vip_id, act } = v
        const s = new Date()
        const date = `${s.getFullYear()}-${s.getMonth() + 1 < 10 ? '0' + (s.getMonth() + 1) : s.getMonth() + 1}-${s.getDate() < 10 ? '0' + s.getDate() : s.getDate()}`
        const tmp = {
            list: list.toString(),
            vip_id,
            activity_id: act,
            date,
            type: 1,
            amount: money
        }
        await addOrder(tmp)
        for (let i = 0; i < selected.length; i++) {
            console.log(selected[i])
            await updateGood({ id: selected[i].good, total: -selected[i].num })
        }
        fetchData();
        message.success('添加成功')
    }
    const fetchMap = async () => {
        const res = await Promise.all([getAct(), getGoodsList(), getSupplier(), getVipList()])
        console.log(res);
        setMaps({
            act: getMap(res[0].data.data),
            fullAct: getFullMap(res[0].data.data),
            good: getFullMap(res[1].data.data),
            goods: getMap(res[1].data.data),
            sup: getMap(res[2].data.data),
            vip: getMap(res[3].data.data)
        })
    }
    const init = async () => {
        if (location.pathname === "/stockManagement/stockIn") {
            setScene("in");
        } else {
            setScene("out");
        }
        if (!maps) {
            await fetchMap()
        }

    }
    useEffect(() => {
        init()
    }, []);

    useEffect(() => {
        calcPrice()
    }, [selected]);
    const fetchData = async (date?) => {
        if (scene) {
            let type;
            scene === 'in' ? type = 0 : type = 1
            const res = await getOrder(date, type)
            setList(res.data.data);
        }
    }
    useEffect(() => {
        fetchData()
        console.log(scene, 'bianhua')
    }, [scene]);
    const deleteSelected = (item) => {
        const tmp = []
        selected.forEach(i => {
            if (i.good !== item.good) {
                tmp.push(i)
            }
        })
        setSelected(tmp)
    }
    const columns = [
        {
            title: "日期",
            dataIndex: "date",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "商品名",
            dataIndex: "list",
            key: "age",
            render: (text: string) => { return <div>{goodAdapter(text).map(i => <span>{i} </span>)}</div> }
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Auth id={scene === 'in' ? 'stockIn-delete' : 'stockOut-delete'}><Button danger onClick={() => { deleteOrder(record.id); fetchData() }}>删除</Button></Auth>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h2>{scene === "in" ? "商品入库" : "商品出库"}</h2>
            <ProForm<{
                name: string;
                num?: string;
                sup_id?: string;
            }> layout="vertical"
                onFinish={async (v) => { scene === 'in' ? income(v.name, v.num, v.sup_id) : outCome(v) }}
                formRef={formRef}
                onValuesChange={(v) => { calcPrice() }}
            >
                {
                    scene === 'in' ?
                        < ProFormSelect
                            label="商品"
                            name="name"
                            valueEnum={maps && maps.goods}
                            placeholder="请选择商品"
                        />
                        :
                        <div>
                            <Form form={form} layout="vertical" onFinish={(value) => { console.log(value) }}>
                                <Item label="商品" name="good">
                                    <Select>
                                        {
                                            maps?.good && Object.keys(maps?.good).map(item => {
                                                return <Option value={item}>{maps?.good[item].title}</Option>
                                            })
                                        }
                                    </Select>
                                </Item>
                                <Item label="数量" name="num">
                                    <Input></Input>
                                </Item>
                                <Button className="mb-[8px]" onClick={() => { const value = form.getFieldsValue(); if (value?.num && value?.good) setSelected([...selected, value]) }}>添加</Button>
                            </Form>
                            {
                                selected.map((item) => {
                                    return (
                                        <Tag closable key={item} onClose={() => { deleteSelected(item) }} >{maps?.good[item.good].title}*{item.num}</Tag>
                                    )
                                })
                            }
                        </div>
                }{
                    scene === 'in' ?
                        <ProFormText
                            name="num"
                            width="md"
                            label="进货量"
                            placeholder="请输入数量"
                        /> : null}
                {
                    scene === 'in' ? <div>
                        <ProFormSelect
                            name="sup_id"
                            label="供应商"
                            valueEnum={maps?.sup}
                        />
                    </div> : <ProFormSelect
                        name="vip_id"
                        label="会员"
                        valueEnum={maps?.vip}
                    />
                }
                {
                    scene === 'out' ?
                        <div>
                            <ProFormSelect
                                name="act"
                                valueEnum={maps?.act}
                                label='活动'
                            />
                            {
                                money ?
                                    <h2 className='mb-[18px]'>
                                        参与活动后金额： {money}元
                                    </h2>
                                    : null
                            }
                            {
                                send ?
                                    <h2 className='mb-[18px]'>
                                        {send}
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
                date: string;
            }>
                onFinish={async (values) => {
                    fetchData(values.date)
                }}
                className="mb-[24px]"
            >
                <ProFormDatePicker name="date" label="日期" />
            </QueryFilter>
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}
