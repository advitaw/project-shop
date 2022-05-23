import order from "../models/db/order";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";
import supplier from "../models/db/supplier";
import category from "../models/db/category";
import Vip from "../models/db/vip";
import activity from "../models/db/activity";
import Goods from "../models/db/goods";
import sequelize from "../models";

const router: Router<any, {}> = new Router();
router.prefix("/order");

router.post('/', async (ctx: ParameterizedContext) => {
    const { act, date, type_id, sup_id, v, amount, current, pageSize } = ctx.request.body;
    console.log(act, date, type_id, sup_id, v, amount, current, pageSize)
    console.log('typeis', type_id)
    supplier.hasOne(order, { foreignKey: 'supplier_id', sourceKey: 'id' })
    order.belongsTo(supplier, { foreignKey: 'supplier_id', targetKey: 'id' })
    Vip.hasOne(order, { foreignKey: 'vip_id', sourceKey: 'id' })
    order.belongsTo(Vip, { foreignKey: 'vip_id', targetKey: 'id' })
    activity.hasOne(order, { foreignKey: 'activity_id', sourceKey: 'id' })
    order.belongsTo(activity, { foreignKey: 'activity_id', targetKey: 'id' })
    const query = { activity_id: act, date, type_id, supplier_id: sup_id, vip_id: v, amount };
    Object.keys(query).map((key) => {
        if (!query[key] && query[key] !== 0) {
            delete query[key];
        }
    });
    const goods = await order.findAll({
        where: query,
        include: [supplier, Vip, activity],
        order: [['id', 'DESC']],
        offset: current ? (+current - 1) * (pageSize || 20) : 0,
        limit: +pageSize || 20
    })
    const count = await order.count({
        where: query
    })
    ctx.body = ctx.formatResponseBody(0, goods, count);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { params } = ctx.request.body;
        console.log(params)
        const { type, amount, list, activity_id, date, vip_id, sup_id } = params
        await order.create({
            type_id: type, amount, list, activity_id, date, vip_id, supplier_id: sup_id
        });
        ctx.body = ctx.formatResponseBody(0);
        return;
    } catch (err) {
        ctx.body = ctx.formatResponseBody(-1);
    }
})

function randomNum(minNum: number, maxNum: number) {
    switch (arguments.length) {
        case 1:
            return Math.floor(Math.random() * minNum + 1);
            break;
        case 2:
            return Math.floor((Math.random() * maxNum - minNum + 1) + minNum);
            break;
        default:
            return 0;
            break;
    }
}
router.post('/mock', async (ctx: ParameterizedContext) => {
    try {
        const s = new Date(1650631307000 + randomNum(1, 20) * 1000 * 60 * 60 * 24)
        const date = `${s.getFullYear()}-${s.getMonth() + 1 < 10 ? '0' + (s.getMonth() + 1) : s.getMonth() + 1}-${s.getDate() < 10 ? '0' + s.getDate() : s.getDate()}`
        const tmp = {
            activity_id: randomNum(1, 3),
            type_id: randomNum(0, 1),
            date,
            supplier_id: randomNum(1, 5),
            vip_id: randomNum(2, 20),
            amount: randomNum(20, 200),
            list: `${randomNum(1, 24)}*${randomNum(1, 3)}`
        }
        console.log(tmp)
        await order.create(tmp)
        ctx.body = ctx.formatResponseBody(0);
        return;
    } catch (err) {
        ctx.body = ctx.formatResponseBody(-1);
    }
})

router.post('/delete', async (ctx: ParameterizedContext) => {
    const { id } = ctx.request.body;
    await order.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, activity, date, type, supplier, vip, amount, list } = ctx.request.body;
    await order.update({ activity, date, type, supplier, vip, amount, list }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})


export default router;