import Good from "../models/db/goods";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";
import Goods from "../models/db/goods";
import category from "../models/db/category";
import Vip from "../models/db/vip";
import record from "../models/db/record";

const router: Router<any, {}> = new Router();
router.prefix("/dash");


router.get('/getDashboard', async (ctx: ParameterizedContext) => {
    const goodNum = await Goods.count();
    category.hasOne(Good, { foreignKey: 'category_id', sourceKey: 'id' })
    Good.belongsTo(category, { foreignKey: 'category_id', targetKey: 'id' })
    const vipNum = await Vip.count();
    const goods = await Goods.findAll({ include: [category] });
    const top = await Goods.findAll(
        { order: [['sales', 'DESC']], limit: 6 }
    );
    const cateData = {}
    console.log(goodNum, vipNum, goods)
    let total = 0
    goods.forEach((item: any) => {
        const num = +item.sales * +item.price
        total += num;
        const label = item?.category?.label
        if (cateData[label]) {
            cateData[label] += num
        } else {
            cateData[label] = num
        }
    })
    const data = { goodNum, vipNum, top, cateData, total }
    ctx.body = ctx.formatResponseBody(0, data);
})
router.get('/record', async (ctx: ParameterizedContext) => {
    const list = await record.findAll()
    const tmp: any = [];
    list.forEach((i: any) => {
        tmp.push({ date: i.date, num: i.num, profit: i.num - i.costing })
    })
    ctx.body = ctx.formatResponseBody(0, tmp);
})

export default router;