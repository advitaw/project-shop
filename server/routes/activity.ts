import activity from "../models/db/activity";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";
import rule from "../models/db/rule";

const router: Router<any, {}> = new Router();
router.prefix("/activity");

router.post('/', async (ctx: ParameterizedContext) => {
    rule.hasOne(activity, { foreignKey: 'rule_id', sourceKey: 'id' })
    activity.belongsTo(rule, { foreignKey: 'rule_id', targetKey: 'id' })
    const { name } = ctx.request.body;
    const acts = await activity.findAll({
        where: {
            name: {
                [Op.substring]: name || ''
            },
        },
        include: rule
    })
    ctx.body = ctx.formatResponseBody(0, acts);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { name, creator, rule, startTime, endTime, list } = ctx.request.body;
        const haveSame = await activity.findOne({ where: { name } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await activity.create({
                name, creator, rule_id: rule, startTime, endTime, list
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
    await activity.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, name, creator, rule, startTime, endTime } = ctx.request.body;
    await activity.update({ name, creator, rule, startTime, endTime }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})


export default router;