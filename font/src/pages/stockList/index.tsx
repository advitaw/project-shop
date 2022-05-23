import React, { useEffect, useState } from "react";
import { QueryFilter, ProFormText, ProFormSelect } from "@ant-design/pro-form";
import { Tree, Button, Card, Modal, Form, Select, Input, Popconfirm } from "antd";
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { getGoodsList, addGood, deleteGood, updateGood, addCat, deleteCat, getCat, getSupplier } from "@/request/axios";

const { Item, useForm } = Form
const { Option } = Select
export default function StockList() {
    const [good, setgood] = useState([]);
    const [cat, setCat] = useState([]);
    const [allCat, setAllCat] = useState([]);
    const [supMap, setSupMap] = useState({})
    const [catMap, setCatMap] = useState({})
    const [catForm] = useForm()
    const [goodForm] = useForm()
    const [showCatModal, setShowCatModal] = useState(false);
    const [showGoodModal, setGoodModal] = useState(false);
    const [currentCat, setCurrentCat] = useState([]);
    const [currentId, setCurrentId] = useState();
    const [mode, setMode] = useState('');
    const fetchGoodsList = async (title?, sup?, cat?) => {
        const res = await getGoodsList(title, sup, cat);
        console.log('goods', res);
        setgood(res?.data?.data)
    }
    const fetchCat = async () => {
        const res = await getCat();
        console.log('getCat', res);
        const list = res?.data?.data;
        const tmp = {}
        for (let i = list?.length - 1; i > -1; i--) {
            tmp[list[i].id] = list[i].label
            list[i].title = list[i].label;
            list[i].key = list[i].id;
            if (list[i].parent !== -1) {
                const p = list[list[i].parent - 1]
                if (p.children) {
                    p.children.push(list[i])
                } else {
                    p.children = [list[i]]
                }
            }
        }
        console.log(list);
        setCatMap(tmp)
        console.log(tmp);
        setAllCat(list);
        setCat([list[0]]);
    }
    const fetchSup = async () => {
        const res = await getSupplier();
        console.log('getSupplier', res);
        const list = res?.data?.data;
        const tmp = {}
        list.forEach((item) => {
            tmp[item.id] = item.name
        })
        setSupMap(tmp);
    }
    const handleAddCat = async () => {
        const value = catForm.getFieldsValue()
        console.log(value);
        await addCat(value.label, value.parent);
        fetchCat();
        setShowCatModal(false);
    }
    const handleAddGood = async () => {
        const value = goodForm.getFieldsValue()
        console.log(value);
        const { url, title, price, supplier_id, total, category_id } = value
        await addGood(url, title, price, category_id, total, category_id);
        fetchGoodsList();
        setGoodModal(false);
    }
    const handleDeleteGood = async (id) => {
        await deleteGood(id)
        fetchGoodsList();
    }
    const handleUpdateGood = async (item) => {
        console.log(item);
        setMode('update')
        goodForm.setFieldsValue(item)
        setCurrentId(item.id)
        setGoodModal(true);
    }
    const UpdateGood = async () => {
        const value = goodForm.getFieldsValue()
        console.log(value);
        const { url, title, price, supplier, total, category } = value
        await updateGood(currentId, url, title, price, supplier, total, category)
        fetchGoodsList();
        setGoodModal(false);
    }
    const handleDeleteCat = async () => {
        await deleteCat(currentCat)
        fetchCat();
    }
    useEffect(() => {
        fetchCat();
        fetchGoodsList();
        fetchSup();
    }, [])
    return (
        <div>
            <div>
                <div className="flex flex-row mb-[24px]">
                    <h2 className="mr-[24px]">商品类型</h2>
                    <div>
                        <Button type="primary" className="mr-[16px]" onClick={() => { setShowCatModal(true) }}>
                            新增
                        </Button>

                        <Popconfirm placement="topLeft" title="确定删除吗？" onConfirm={handleDeleteCat} okText="Yes" cancelText="No">
                            <Button type="default">删除</Button>
                        </Popconfirm>
                    </div>
                </div>

                <Tree
                    checkable
                    onCheck={(value) => setCurrentCat(value)}
                    showLine
                    treeData={cat}
                    className="mb-[24px] bg-[#f0f2f5]"
                />
            </div>
            <h2 className="mb-[24px]">商品列表</h2>
            <Button type="primary" className="mr-[16px]" onClick={() => { setGoodModal(true); setMode('add') }}>
                新增
            </Button>
            <QueryFilter<{
                title: string;
                sup: string;
                cat: string;
            }>
                onFinish={async (values) => {
                    fetchGoodsList(values.title, values.sup, values.cat)
                }}
                className="mb-[24px]"
            >
                <ProFormText name="title" label="商品名称" />
                <ProFormSelect
                    name="sup"
                    label="供货商"
                    valueEnum={supMap}
                />
                <ProFormSelect
                    name="cat"
                    label="分类"
                    valueEnum={catMap}
                />
            </QueryFilter>
            <div className="flex w-[100%] flex-row flex-wrap">
                {good?.map((item) => {
                    return (
                        <Card
                            className="m-[16px]"
                            key={item?.title}
                            style={{ width: 300 }}
                            title={item?.title}
                            cover={
                                <img
                                    alt="example"
                                    src={item.url}
                                    width="300px"
                                    height="200px"
                                />
                            }

                            actions={[
                                <Popconfirm placement="topLeft" title="确定删除该角色吗？" onConfirm={() => handleDeleteGood(item.id)} okText="Yes" cancelText="No">
                                    <CloseOutlined key="del" onClick={(e) => e.stopPropagation()} />
                                </Popconfirm>
                                ,
                                <EditOutlined key="edit" onClick={() => handleUpdateGood(item)} />,
                            ]}
                        >
                            <div>价格: {item?.price}元</div>
                            <div>供应商: {item?.supplier?.name}</div>
                            <div>库存量: {item?.total}</div>
                        </Card>
                    );
                })}
            </div>
            <Modal className="p-[28px]" visible={showCatModal} maskClosable={false} onCancel={() => setShowCatModal(false)} onOk={handleAddCat}>
                <Form form={catForm}>
                    <Item name="label" label="类别名称">
                        <Input ></Input>
                    </Item>
                    <Item name="parent" label="选择归属类别">
                        <Select >
                            {
                                allCat ? allCat.map((item) => {
                                    return <Option value={item.id}>{item.label}</Option>
                                }) : null
                            }
                        </Select>
                    </Item>
                </Form>
            </Modal>

            <Modal className="p-[28px]" visible={showGoodModal} maskClosable={false} onCancel={() => setGoodModal(false)} onOk={mode === 'add' ? handleAddGood : UpdateGood}>
                <Form form={goodForm}>
                    <Item name="title" label="商品名称">
                        <Input ></Input>
                    </Item>
                    <Item name="price" label="商品价格">
                        <Input ></Input>
                    </Item>
                    <Item name="total" label="商品库存">
                        <Input ></Input>
                    </Item>
                    <Item name="url" label="商品图片">
                        <Input ></Input>
                    </Item>
                    <Item name="supplier_id" label="选择供应商">
                        <Select >
                            {
                                supMap ? Object.keys(supMap).map((item) => {
                                    return <Option value={item}>{supMap[item]}</Option>
                                }) : null
                            }
                        </Select>
                    </Item>
                    <Item name="category_id" label="选择归属类别">
                        <Select >
                            {
                                catMap ? Object.keys(catMap).map((item) => {
                                    return <Option value={item}>{catMap[item]}</Option>
                                }) : null
                            }
                        </Select>
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}
