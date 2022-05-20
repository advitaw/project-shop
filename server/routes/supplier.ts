import supplier from "../models/db/supplier";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";
import category from "../models/db/category";

const router: Router<any, {}> = new Router();
router.prefix("/supplier");

router.post('/', async (ctx: ParameterizedContext) => {
    const { name, phone, linkman, address, type} = ctx.request.body;
    category.hasOne(supplier, { foreignKey: 'type', sourceKey: 'id' })
    supplier.belongsTo(category, { foreignKey: 'type', targetKey: 'id' })
    const query = { name, phone, linkman, address, type };
    Object.keys(query).map((key) => {
        if (!query[key]) {
            delete query[key];
        }
    });
    const goods = await supplier.findAll({
        where: {
            ...query,
            name: {
                [Op.substring]: name || ''
            }
        },
        include: [category]
    })
    ctx.body = ctx.formatResponseBody(0, goods);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { name, address, phone, linkman, type } = ctx.request.body;
        const haveSame = await supplier.findOne({ where: { name } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await supplier.create({
                name, address, phone, linkman, type
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
    await supplier.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, name, address, phone, linkman, type } = ctx.request.body;
    await supplier.update({ name, address, phone, linkman, type }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})


export default router;