import rule from "../models/db/rule";
import Router from "koa-router";
import { ParameterizedContext } from "koa";

const router: Router<any, {}> = new Router();
router.prefix("/rule");

router.get('/', async (ctx: ParameterizedContext) => {
    const rules = await rule.findAll();
    ctx.body = ctx.formatResponseBody(0, rules);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { name, limit, dec, type } = ctx.request.body;
        const haveSame = await rule.findOne({ where: { name } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await rule.create({
                name, limit, dec, type
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
    await rule.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, name, limit, desc, type } = ctx.request.body;
    await rule.update({ name, limit, desc, type }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})


export default router;