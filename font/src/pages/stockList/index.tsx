import React, { useState } from "react";
import { QueryFilter, ProFormText, ProFormSelect } from "@ant-design/pro-form";
import { Tree, Button, Card } from "antd";
import { types } from "@/mock/type";
import { suppliersMap } from "@/mock";
import { goods } from "@/mock/goods";

export default function StockList() {
    const [good, setgood] = useState(goods);
    return (
        <div>
            <div>
                <div className="flex flex-row mb-[24px]">
                    <h2 className="mr-[24px]">商品类型</h2>
                    <div>
                        <Button type="primary" className="mr-[16px]">
                            新增
                        </Button>
                        <Button type="default">删除</Button>
                    </div>
                </div>

                <Tree
                    checkable
                    onSelect={(value) => console.log(value)}
                    onCheck={() => setgood(good.filter(item => item.id < 4))}
                    showLine
                    treeData={types}
                    className="mb-[24px] bg-[#f0f2f5]"
                />
            </div>
            <h2 className="mb-[24px]">商品列表</h2>
            <QueryFilter<{
                name: string;
                supplier: string;
                type: string;
            }>
                onFinish={async (values) => {
                    const res = goods.filter((item) => {
                        return item.title === values.name;
                    });
                    setgood(res);
                }}
                className="mb-[24px]"
            >
                <ProFormText name="name" label="商品名称" />
                <ProFormSelect
                    name="supplier"
                    label="供货商"
                    valueEnum={suppliersMap}
                />

                <ProFormSelect name="type" label="商品类别" />
            </QueryFilter>
            <div className="flex w-[100%] flex-row flex-wrap">
                {good?.map((item) => {
                    return (
                        <Card
                            className="m-[16px]"
                            key={item.title}
                            style={{ width: 300 }}
                            title={item.title}
                            cover={
                                <img
                                    alt="example"
                                    src={item.url}
                                    width="300px"
                                    height="200px"
                                />
                            }
                        >
                            <div>价格: {item.price}元</div>
                            <div>供应商: {item.supplier}</div>
                            <div>库存量: {item.num}</div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
