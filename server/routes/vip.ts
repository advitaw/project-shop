import Vip from "../models/db/vip";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";

const router: Router<any, {}> = new Router();
router.prefix("/vip");

router.post('/', async (ctx: ParameterizedContext) => {
    const { name } = ctx.request.body;
    let vips;
    if(name) {
        vips = await Vip.findAll({
            where: {
                name: {
                    [Op.substring]: name,
                }
            }
        });
    }else {
        vips = await Vip.findAll();
    }
    ctx.body = ctx.formatResponseBody(0, vips);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { name, sex, phone, score } = ctx.request.body;
        console.log('新增vip', name, sex, phone, score)
        const haveSame = await Vip.findOne({ where: { name } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await Vip.create({
                name, sex, phone, score
            });
            ctx.body = ctx.formatResponseBody(0);
            return;
        }
    } catch (err) {
        ctx.body = ctx.formatResponseBody(-1);
    }
})

router.post('/delete', async (ctx: ParameterizedContext) => {
    const { id } = ctx.request.body;
    await Vip.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, name, sex, phone, score } = ctx.request.body;
    await Vip.update({ name, sex, phone, score }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})
export default router;