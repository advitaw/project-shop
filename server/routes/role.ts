import Role from "../models/db/role";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import User from "../models/db/user";

const router: Router<any, {}> = new Router();
router.prefix("/role");

router.get('/', async (ctx: ParameterizedContext) => {
    const roles = await Role.findAll();
    ctx.body = ctx.formatResponseBody(0, roles);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { label, pageList, disabledComponents } = ctx.request.body;
        console.log('新增角色', label, pageList, disabledComponents)
        const haveSame = await Role.findOne({ where: { label } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await Role.create({
                label,
                pageList,
                disabledComponents
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
    await Role.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);   

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, label, pageList, disabledComponents } = ctx.request.body;
    await Role.update({ label, pageList, disabledComponents }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})

export default router;