import { Input, Button, Form, message } from "antd";
import { login } from '@/request/axios';
const { Item } = Form;
const Login = (props) => {
    const handleFinish = async (value) => {
        const { name, password } = value;
        const res = await login(name, password);
        console.log(res);
        switch(res?.data?.code) {
            case 0: 
                localStorage.setItem('token', res?.data?.data);
                props.history.push('/');
                break;
            case 101:
                message.error('密码错误');
                break;
            case 102:
                message.error('用户名不存在');
                break;
        }
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
                    <Item label="账号" name="name" rules={[{ type: 'string', required: true, message: '请输入账号！' }]}>
                        <Input placeholder="请输入账号" />
                    </Item>
                    <Item label="密码" name="password" rules={[{ type: 'string', required: true, message: '请输入密码！' }]}>
                        <Input.Password placeholder="请输入密码" />
                    </Item>
                    <div className="w-[80px] text-gray-500 absolute right-[60px] top-[95px]">忘记密码？</div>
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