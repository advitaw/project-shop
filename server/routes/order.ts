import order from "../models/db/order";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";

const router: Router<any, {}> = new Router();
router.prefix("/order");

router.post('/', async (ctx: ParameterizedContext) => {
    const { activity, date, type, supplier, vip, amount } = ctx.request.body;
    const query = { activity, date, type, supplier, vip, amount };
    Object.keys(query).map((key) => {
        if (!query[key]) {
            delete query[key];
        }
    });
    const goods = await order.findAll({
        where: query
    })
    ctx.body = ctx.formatResponseBody(0, goods);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { activity, date, type, supplier, vip, amount, list } = ctx.request.body;
        await order.create({
            activity, date, type, supplier, vip, amount, list
        });
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