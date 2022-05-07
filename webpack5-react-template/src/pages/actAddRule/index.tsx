import React from 'react';
import { Form, Input, Button, Space, Select, Card, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { actRule } from '@/mock/act';
const { Option } = Select;
const { Item } = Form;
const areas = [
  { label: '满减', value: 0 },
  { label: '打折', value: 1 },
  { label: '赠礼', value: 2 },
];
const discountWord = ['减', '打', '赠送']
const actAddRule = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ limits: [] });
  };

  return (
    <div>
      <h2>新增活动规则
      </h2>
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Item label="活动名称" name="name">
          <Input />
        </Item>
        <Item name="rule" label="活动规则" rules={[{ required: true, message: '活动规则为必选项' }]}>
          <Select options={areas} onChange={handleChange} />
        </Item>
        <Form.List name="limits">
          {(fields, { add, remove }) => (
            <div className='flex flex-row flex-wrap justify-center items-center'>
              {fields.map(field => (
                <Space key={field.key} align="baseline">
                  <Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area || prevValues.limits !== curValues.limits
                    }
                  >
                    {() => (
                      <Item
                        {...field}
                        label="满"
                        name={[field.name, 'limit']}
                        rules={[{ required: true, message: 'Missing limit' }]}
                      >
                        <Input width="500">
                        </Input>
                      </Item>
                    )}
                  </Item>
                  <Item
                    {...field}
                    label={discountWord[form.getFieldValue('rule')]}
                    name={[field.name, 'price']}
                    rules={[{ required: true, message: 'Missing price' }]}
                  >
                    <Input width="500" />
                  </Item>
                  <div>{form.getFieldValue('rule') === 1 ? '折' : null}</div>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Item className="w-[100%]">
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  增加
                </Button>
              </Item>
            </div>
          )}
        </Form.List>
        <Item>
          <Button type="primary" htmlType="submit" onClick={()=>{message.success({content:'创建成功！'})}}>
            创建
          </Button>
        </Item>
      </Form>
      <h2>历史活动详情  </h2>
      <div>
        {
          actRule.map((item) => {
            if (item.id !== 3)
              return (
                <Card
                  hoverable
                  className="bg-gray m-[48px] rounded-[12px]"
                  title={<h2>{item.name}</h2>}
                >
                  {
                    item.desc.map((i) => {
                      return <div>{i}</div>
                    })
                  }
                </Card>
              )
          })
        }
      </div>
    </div>
  );
};

export default actAddRule;