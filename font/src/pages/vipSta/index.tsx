import React, { useEffect, useState } from "react";
import { Chart } from '@antv/g2'
import { vipSta } from "@/request/axios";
const renderSex = (data) => {
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
      val = (val * 100).toFixed(2) + '%';
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
      percent = (percent * 100).toFixed(2) + '%';
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
const renderAge = (data) => {
  const chart = new Chart({
    container: 'c1',
    autoFit: true,
    height: 500,
    width: 500,
    padding: [50, 20, 50, 20],
  });
  chart.data(data);
  chart.scale('value', {
    alias: '人',
  });

  chart.axis('type', {
    tickLine: {
      alignTick: false,
    },
  });
  chart.axis('value', false);

  chart.tooltip({
    showMarkers: false,
  });
  chart.interval().position('type*value');
  chart.interaction('element-active');

  // 添加文本标注
  data.forEach((item) => {
    chart
      .annotation()
      .text({
        position: [item.type, item.value],
        content: item.value,
        style: {
          textAlign: 'center',
        },
        offsetY: -30,
      })
      .text({
        position: [item.type, item.value],
        content: (item.percent * 100).toFixed(0) + '%',
        style: {
          textAlign: 'center',
        },
        offsetY: -12,
      });
  });
  chart.render();
}
const renderLine = () => {
  const data = [
    {
      "date": "2021-05",
      "num": 20
    }, {
      "date": "2021-06",
      "num": 43
    }, {
      "date": "2021-07",
      "num": 85
    }, {
      "date": "2021-08",
      "num": 100
    }, {
      "date": "2021-09",
      "num": 123
    },
    {
      "date": "2021-10",
      "num": 133
    }, {
      "date": "2021-11",
      "num": 145
    }, {
      "date": "2021-12",
      "num": 169
    }, {
      "date": "2022-01",
      "num": 197
    }, {
      "date": "2022-02",
      "num": 240
    },
    {
      "date": "2022-03",
      "num": 283
    }, {
      "date": "2022-04",
      "num": 323
    }, {
      "date": "2022-05",
      "num": 400
    }
  ];
  const chart = new Chart({
    container: 'c3',
    autoFit: true,
    height: 500,
    width: 500
  });

  chart.data(data);
  chart.scale({
    year: {
      range: [0, 1],
    },
    value: {
      min: 0,
      nice: true,
    },
  });

  chart.tooltip({
    showCrosshairs: true, // 展示 Tooltip 辅助线
    shared: true,
  });

  chart.line().position('date*num').label('人数');
  chart.point().position('date*num');

  chart.render();

}
export default function VipSta() {
  const [data, setData] = useState({})
  const fetchData = async () => {
    const res = await vipSta();
    setData(res.data?.data)
  }
  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    if (data?.sexMap) {
      const sex = [{ item: '男', count: data?.sexMap[1], percent: data?.sexMap[1] / data?.total }, { item: '女', count: data?.sexMap[0], percent: data?.sexMap[0] / data?.total }]
      const age = []
      Object.keys(data?.ageMap).map((i) => {
        age.push({ type: i, value: data?.ageMap[i], percent: data?.ageMap[i] / data?.total })
      })
      console.log(sex, age)
      renderAge(age);
      renderLine();
      renderSex(sex);
    }
  }, [data]);
  return (
    <div>
      <h2>会员信息统计页面</h2>
      <div>
        <h2>会员年龄分布图</h2>
        <div id='c1'></div>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <div className='flex-1'>
          <h2>会员男女比例图</h2>
          <div id='c2'></div>
        </div>
        <div className='flex-1'>
          <h2>会员数量增长图</h2>
          <div id='c3'></div>
        </div>
      </div>
    </div>
  );
}
