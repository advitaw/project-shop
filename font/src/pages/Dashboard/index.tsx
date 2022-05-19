import React, { useEffect } from "react";
import Card from "@/components/card";
import {
    ShoppingOutlined,
    MoneyCollectOutlined,
    UserOutlined,
} from "@ant-design/icons"; import { Chart } from '@antv/g2';
import { Table } from "antd";
const render = () => {
    const data = [
        { item: '水饮', count: 40, percent: 0.4 },
        { item: '零食', count: 21, percent: 0.21 },
        { item: '烟酒', count: 17, percent: 0.17 },
        { item: '防疫', count: 13, percent: 0.13 },
        { item: '生活用品', count: 9, percent: 0.09 },
    ];

    const chart = new Chart({
        container: 'c2',
        autoFit: true,
        height: 600,
        width: 600
    });

    chart.data(data);

    chart.coordinate('theta', {
        radius: 0.85
    });

    chart.scale('percent', {
        formatter: (val) => {
            val = val * 100 + '%';
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
            percent = percent * 100 + '%';
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
const list = [
    {
        name: '可乐',
        sales: 5000,
        price: 3
    },
    {
        name: '雪碧',
        sales: 4000,
        price: 3
    },
    {
        name: '薯片',
        sales: 3000,
        price: 5
    },
    {
        name: '餐巾纸',
        sales: 2500,
        price: 1
    },
    {
        name: '口罩',
        sales: 2000,
        price: 10
    },
    {
        name: '消毒纸巾',
        sales: 1000,
        price: 3
    }
]
const columns = [
    {
        title: "商品名称",
        dataIndex: "name",
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
    useEffect(() => {
        const chart = new Chart({
            container: 'c1',
            width: 600,
            height: 600,
        });
        const lineData = [
            {
                "date": "2021-05",
                "profit": 4000,
                "num": 12000
            }, {
                "date": "2021-06",
                "profit": 4500,
                "num": 13000
            }, {
                "date": "2021-07",
                "profit": 4000,
                "num": 14000
            }, {
                "date": "2021-08",
                "profit": 3000,
                "num": 10000
            }, {
                "date": "2021-09",
                "profit": 3000,
                "num": 8000
            },
            {
                "date": "2021-10",
                "profit": 2500,
                "num": 7000
            }, {
                "date": "2021-11",
                "profit": 3000,
                "num": 9000
            }, {
                "date": "2021-12",
                "profit": 2500,
                "num": 11000
            }, {
                "date": "2022-01",
                "profit": 3000,
                "num": 12000
            }, {
                "date": "2022-02",
                "profit": 3000,
                "num": 14000
            },
            {
                "date": "2022-03",
                "profit": 3500,
                "num": 15000
            }, {
                "date": "2022-04",
                "profit": 3500,
                "num": 13000
            }, {
                "date": "2022-05",
                "profit": 4000,
                "num": 13000
            }
        ]
        chart.data(lineData);
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
        render()
    }, [])
    return (
        <div>
            <div className="flex flex-row w-[100%] mb-[48px]">
                <Card
                    title="商品总数"
                    num={42}
                    color="bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                    <ShoppingOutlined style={{ fontSize: "48px" }} />
                </Card>
                <Card
                    title="销售总额"
                    num={210000}
                    color={"bg-gradient-to-r from-indigo-500 to-gray-500"}
                >
                    <MoneyCollectOutlined style={{ fontSize: "48px" }} />
                </Card>
                <Card
                    title="会员总数"
                    num={400}
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
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}
