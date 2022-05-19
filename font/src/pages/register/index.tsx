import React from "react";
import { Input, Button, Form, message } from "antd";
import { register } from "@/request/axios";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo, globalPageList } from "@/store";
const { Item } = Form;
const Register = () => {
    const [, setUser] = useRecoilState(userInfo);
    const [, setList] = useRecoilState(globalPageList);
    const history = useHistory();
    const handleFinish = async (value) => {
        const res = await register(value);
        console.log(res);
        switch (res?.data?.code) {
            case 0:
                localStorage.setItem("token", res?.data?.data);
                setUser(res?.data?.extra?.dataValues);
                setList(res?.data?.extra?.list);
                localStorage.setItem(
                    "usr",
                    JSON.stringify(res?.data?.extra?.dataValues)
                );
                localStorage.setItem(
                    "list",
                    JSON.stringify(res?.data?.extra?.list)
                );
                history.push("/");
                break;
            case 100:
                message.error("用户名已存在");
                break;
            case -1:
                message.error("系统错误");
                break;
        }
    };
    return (
        <div className="flex justify-center h-[100vh] items-center bg-gradient-to-b from-sky-500 to-indigo-500">
            <div className="w-[600px] border-[1px] border-slate-500 rounded-lg bg-white flex flex-col">
                <div className="text-[40px] text-center mt-[50px] border-b-[1px] mb-[20px]">
                    注册
                </div>
                <Form
                    onFinish={handleFinish}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Item
                        label="账号"
                        name="name"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入账号！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入账号" />
                    </Item>
                    <Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入密码！",
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Item>
                    <Item
                        name="confirm"
                        label="确认密码"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "请确认密码",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("输入与密码不同，请确认!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="确认你的密码" />
                    </Item>
                    <Item
                        label="值班时间"
                        name="workTime"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入值班时间！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入值班时间" />
                    </Item>
                    <Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入手机号！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入手机号" />
                    </Item>
                    <Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入邮箱！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入邮箱" />
                    </Item>
                    <Item
                        label="昵称"
                        name="nickName"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入昵称！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入昵称" />
                    </Item>
                    <Item
                        label="负责店面"
                        name="shopName"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入负责店面！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入负责店面" />
                    </Item>
                    <Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button className="w-[200px]" htmlType="submit">
                            注册
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};
export default Register;
/*
 */
