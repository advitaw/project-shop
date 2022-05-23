import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import {
    ShoppingOutlined,
    MoneyCollectOutlined,
    UserOutlined,
} from "@ant-design/icons"; import { Chart } from '@antv/g2';
import { Table } from "antd";
import { getDash, getRecord, getRule } from "@/request/axios";
const render = (data) => {
    const chart = new Chart({
        container: 'c2',
        autoFit: true,
        height: 600,
        width: 600
    });
    console.log(data);
    chart.data(data);

    chart.coordinate('theta', {
        radius: 0.85
    });

    chart.scale('percent', {
        formatter: (val) => {
            val = (val * 100).toFixed(1) + '%';
            return val;
        },
    });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.axis(false); // 关闭坐标轴
    const interval = chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
            offset: -40,
            style: {
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
                fill: '#fff',
            },
        })
        .tooltip('item*percent', (item, percent) => {
            percent = (percent * 100).toFixed(1) + '%';
            return {
                name: item,
                value: percent,
            };
        })
        .style({
            lineWidth: 1,
            stroke: '#fff',
        });
    chart.interaction('element-single-selected');
    chart.render();

    // 默认选择
    interval.elements[0].setState('selected', true);

}
const columns = [
    {
        title: "商品名称",
        dataIndex: "title",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "商品销量",
        dataIndex: "sales",
        key: "sales",
    },
    {
        title: "商品单价",
        dataIndex: "price",
        key: "price",
    },
];
export default function Dashboard() {
    const [data, setData] = useState({});
    const [record, setR] = useState([]);
    const fetchDash = async () => {
        const res = await getDash()
        const r = await getRecord()
        setData(res.data?.data)
        setR(r.data.data)
    }
    useEffect(() => {
        fetchDash()
    }, [])
    useEffect(() => {
        console.log(record)
        if (record.length > 0) {
            const chart = new Chart({
                container: 'c1',
                width: 600,
                height: 600,
            });
            chart.data(record);
            chart.scale({
                profit: {
                    min: 0,
                    max: 10000
                },
                num: {
                    min: 0,
                    max: 20000
                }
            });
            chart.line().position('date*profit').label('利润').color('#1890ff');
            chart.line().position('date*num').label('流水').color('#2fc25b');
            chart.render();
        }
    }, [record])
    useEffect(() => {
        const tmp = []
        const d = data?.cateData;
        if (d) {
            Object.keys(d).map(i => {
                tmp.push({ item: i, count: d[i], percent: (d[i] / data.total) })
            })
            render(tmp)
        }
    }, [data])
    return (
        <div>
            <div className="flex flex-row w-[100%] mb-[48px]">
                <Card
                    title="商品总数"
                    num={data?.goodNum}
                    color="bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                    <ShoppingOutlined style={{ fontSize: "48px" }} />
                </Card>
                <Card
                    title="销售总额"
                    num={data?.total}
                    color={"bg-gradient-to-r from-indigo-500 to-gray-500"}
                >
                    <MoneyCollectOutlined style={{ fontSize: "48px" }} />
                </Card>
                <Card
                    title="会员总数"
                    num={data?.vipNum}
                    color={"bg-gradient-to-r from-teal-600 to-gray-500"}
                >
                    <UserOutlined style={{ fontSize: "48px" }} />
                </Card>
            </div>
            <div className="flex flex-row">
                <div className="flex-1">
                    <h2>流水-利润统计图</h2>
                    <div id="c1">
                    </div>
                </div>
                <div className="flex-1">
                    <h2>销售额占比图</h2>
                    <div id="c2">
                    </div>
                </div>
            </div>
            <h2>销售榜单</h2>
            <Table columns={columns} dataSource={data?.top} />;
        </div>
    );
}
