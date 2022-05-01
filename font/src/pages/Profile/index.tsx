import { Form, Input } from 'antd';
const { Item } = Form;
export default function Profile() {
  return (
    <div className="bg-gray-300 w-[80vw] h-[80vh] m-auto rounded-[10px]">
      <div className="p-[15px] ">
        <div>个人信息</div>
        <Form>
          <Item label="昵称">
            <Input placeholder="请输入昵称"></Input>
          </Item>
          <Item label="手机号">
            <Input placeholder="请输入手机号"></Input>
          </Item>
          <Item label="邮箱">
            <Input placeholder="请输入邮箱"></Input>
          </Item>
          <Item label="角色">
            <Input placeholder="请输入角色"></Input>
          </Item>
          <Item label="负责店铺">
            <Input placeholder="请输入负责店铺"></Input>
          </Item>
          <Item label="工作时间">
            <Input placeholder="请输入工作时间"></Input>
          </Item>
        </Form>
      </div>
    </div>
  );
}
