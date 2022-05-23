import React, { useEffect, useState } from "react";
import { Form, Select, Input, Tag, DatePicker, Button, Card, message } from 'antd';
import { actRule } from "@/mock/act";
import { addAct, getGoodsList, getRule } from "@/request/axios";
const { RangePicker } = DatePicker
const { Item, useForm } = Form;
const { Option } = Select;
export default function ActAdd() {
  const [goods, setGoods] = useState([]);
  const [list, setList] = useState([]);
  const [rule, setRule] = useState([]);
  const [form] = useForm();
  const fetchData = async () => {
    const res = await getGoodsList()
    setGoods(res?.data?.data)
    const ruleRes = await getRule()
    setRule(ruleRes.data?.data)
  }
  const handleAdd = async () => {
    const value = form.getFieldsValue()
    const { name, rule, startTime, endTime, list } = value
    await addAct(name, 'admin', rule, startTime.format('x'), endTime.format('x'), list.toString(','))
    message.success('创建成功')
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      <h2>新建营销活动</h2>
      <div>
        <Form form={form}>
          <Item label="活动名称" name="name">
            <Input />
          </Item>
          <Item label="活动开始时间" name="startTime">
            <DatePicker showTime />
          </Item>
          <Item label="活动开始时间" name="endTime">
            <DatePicker showTime />
          </Item>
          <Item label="活动规则" name="rule">
            <Select>
              {
                rule.length > 0 ? rule.map((item) => {
                  return (
                    <Option value={item.id}>{item.name}</Option>
                  )
                }) : null
              }
            </Select>
          </Item>
          <Item label="参与活动商品" name="list">
            <Select mode="multiple"
              allowClear
              onChange={(v) => setList(v)}>
              {
                goods.map((item) => {
                  return (
                    <Option value={item.id}>{item.title}</Option>
                  )
                })
              }

            </Select>
          </Item>
          <Button type="primary" onClick={handleAdd}>创建</Button>

          <div className="flex w-[100%] flex-row flex-wrap">
            {list && list?.map((i) => {
              const item = goods[i - 1];
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
                  <div>供应商: {item.supplier.name}</div>
                  <div>库存量: {item.total}</div>
                </Card>
              );
            })}
          </div>
        </Form>
      </div>
    </div>
  );
}
