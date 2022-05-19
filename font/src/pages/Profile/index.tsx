import React, { useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import { updateInfo } from "@/request/axios";
const { Item, useForm } = Form;
const localUsr = JSON.parse(localStorage.getItem('usr'));
export default function Profile() {
  const [form] = useForm();
  const update = async (item) => {
    console.log(item);
    const res = await updateInfo(localUsr.id, item)
    console.warn('更新成功', res);
    localStorage.setItem('usr', JSON.stringify(res.data.data[0]))
  }
  useEffect(() => {
    form.setFieldsValue(localUsr);
  }, [])

  return (
    <div className=" w-[80vw] h-[80vh] m-auto rounded-[10px]">
      <div className="p-[15px] ">
        <h2>个人信息</h2>
        <Form form={form} onFinish={(value) => update(value)} className="mt-[24px]">
          <Item label="昵称" name="nickName">
            <Input placeholder="请输入昵称" className="w-[200px]"></Input>
          </Item>
          <Item label="手机号" name="phone">
            <Input placeholder="请输入手机号" className="w-[200px]"></Input>
          </Item>
          <Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" className="w-[200px]"></Input>
          </Item>
          <Item label="负责店铺" name="shopName">
            <Input placeholder="请输入负责店铺" className="w-[200px]"></Input>
          </Item>
          <Item label="工作时间" name="workTime">
            <Input placeholder="请输入工作时间" className="w-[200px]"></Input>
          </Item>
          <Button htmlType="submit">保存修改</Button>
        </Form>
      </div>
    </div >
  );
}
