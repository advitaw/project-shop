import React from "react";
import { Input, Button, Form, message } from "antd";
import { changePassword, register } from "@/request/axios";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo, globalPageList } from "@/store";
const { Item } = Form;
const FindPassword = () => {
    const [, setUser] = useRecoilState(userInfo);
    const [, setList] = useRecoilState(globalPageList);
    const history = useHistory();
    const handleFinish = async (value) => {
        console.log(value);
        await changePassword(value.name, value.password)
        message.success('修改成功')
        history.push('login')
    };
    return (
        <div className="flex justify-center h-[100vh] items-center bg-gradient-to-b from-sky-500 to-indigo-500">
            <div className="w-[600px] border-[1px] border-slate-500 rounded-lg bg-white flex flex-col">
                <div className="text-[40px] text-center mt-[50px] border-b-[1px] mb-[20px]">
                    找回密码
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
                        label="新的密码"
                        name="password"
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: "请输入新的密码！",
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入新的密码" />
                    </Item>
                    <Item
                        name="confirm"
                        label="确认新的密码"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "请确认新的密码",
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
                    <Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button type="primary" className="w-[200px]" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};
export default FindPassword;
/*
 */
