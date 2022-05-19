import React, { useState } from "react";
import { Form, Select, Input, Tag, DatePicker, Button, Card, message } from 'antd';
import { goods } from "@/mock/goods";
import { actRule } from "@/mock/act";
const { RangePicker } = DatePicker
const { Item } = Form;
const { Option } = Select;
export default function ActAdd() {
  const [list, setList] = useState<string[]>();
  return (
    <div>
      <h2>新建营销活动</h2>
      <div>
        <Form>
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
                actRule.map((item) => {
                  return (
                    <Option value={item.id}>{item.name}</Option>
                  )
                })
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
          <Button type="primary" onClick={()=>{message.success({content:'创建成功！'})}}>创建</Button>

          <div className="flex w-[100%] flex-row flex-wrap">
            {list && list?.map((i) => {
              const item = goods[i];
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
        </Form>
      </div>
    </div>
  );
}
