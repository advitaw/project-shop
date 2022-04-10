import { Input, Button, Form } from "antd";
const { Item } = Form;
const Login = () => {
    const handleFinish = (value) => {
        console.log(value);
    }
    return (
        <div className="flex justify-center h-[100vh] items-center bg-gradient-to-b from-sky-500 to-indigo-500">
            <div className="w-[600px] h-[400px] border-[1px] border-slate-500 rounded-lg bg-white">
                <div className="text-[40px] text-center mt-[50px] border-b-[1px]">Login</div>
                <Form
                    onFinish={handleFinish}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    className="w-[100%] h-[50%] translate-y-[25%]"
                >
                    <Item label="账号" name="name" rules={[{ required: true, message: '请输入账号！' }]} required>
                        <Input />
                    </Item>
                    <Item label="密码" name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                        <Input.Password />
                        <div className="mt-[10px] w-[80px] text-gray-500 absolute right-0">忘记密码？</div>
                    </Item>
                    <Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button className="w-[200px] mt-[20px]" htmlType="submit" type="primary">登录</Button>
                    </Item>
                    <Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button className="w-[200px]">注册</Button>
                    </Item>
                </Form>
            </div>
        </div>
    )
}
export default Login;
/*
*/