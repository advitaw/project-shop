import Vip from "../models/db/vip";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";

const router: Router<any, {}> = new Router();
router.prefix("/vip");

router.post('/', async (ctx: ParameterizedContext) => {
    const { name } = ctx.request.body;
    let vips;
    if (name) {
        vips = await Vip.findAll({
            where: {
                name: {
                    [Op.substring]: name,
                }
            }
        });
    } else {
        vips = await Vip.findAll();
    }
    ctx.body = ctx.formatResponseBody(0, vips);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { name, sex, phone, score, age } = ctx.request.body;
        console.log('新增vip', name, sex, phone, score)
        const haveSame = await Vip.findOne({ where: { name } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await Vip.create({
                name, sex, phone, score, age
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
    const { id, name, sex, phone, score, age } = ctx.request.body;
    await Vip.update({ name, sex, phone, score, age }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})

router.get('/sta', async (ctx: ParameterizedContext) => {
    const list = await Vip.findAll()
    const sexMap = { 0: 0, 1: 0 }
    const ageMap = { '18-24': 0, '25-35': 0, '35-45': 0, '45以上': 0 }
    list.forEach((i: any) => {
        sexMap[i.sex] += 1
        if (i.age < 24) {
            ageMap['18-24'] += 1
        } else if (i.age < 35) {
            ageMap['25-35'] += 1
        } else if (i.age < 45) {
            ageMap['35-45'] += 1
        } else {
            ageMap['45以上'] += 1
        }
    })
    ctx.body = ctx.formatResponseBody(0, { sexMap, ageMap, total: list.length });
})
export default router;